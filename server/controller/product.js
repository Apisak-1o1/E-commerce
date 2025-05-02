const prisma = require("../config/prisma")
const cloudinary = require('cloudinary').v2;

exports.create = async (req, res) => {
    try {
        const { title, description, price, quantity, categoryId, images } = req.body
        const product = await prisma.product.create({
            data: {
                title: title,
                description: description,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                categoryId: parseInt(categoryId),
                images: {
                    create: images.map((item) => ({
                        asset_id: item.asset_id,
                        public_id: item.public_id,
                        url: item.url,
                        secure_url: item.secure_url
                    }))
                }
            }
        })
        res.send('created')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "server Error" })
    }
}

exports.list = async (req, res) => {
    try {
        const { count } = req.params
        const products = await prisma.product.findMany({
            take: parseInt(count),
            orderBy: { createdAt: "desc" },
            include: {
                category: true,
                images: true
            }
        })
        res.send(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "server Error" })
    }
}

exports.read = async (req, res) => {
    try {
        const { id } = req.params
        console.log("CALLED /product/:id with id =", id);
        const products = await prisma.product.findFirst({
            where: {
                id: Number(id)
            },
            include: {
                category: true,
                images: true
            }
        })
        res.send(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.update = async (req, res) => {
    try {
        const { title, description, price, quantity, categoryId, images } = req.body

        await prisma.image.deleteMany({
            where: {
                productId: Number(req.params.id)
            }
        })
        const product = await prisma.product.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                title: title,
                description: description,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                categoryId: parseInt(categoryId),
                images: {
                    create: images.map((item) => ({
                        asset_id: item.asset_id,
                        public_id: item.public_id,
                        url: item.url,
                        secure_url: item.secure_url
                    }))
                }
            }
        })
        res.send('update')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "server Error" })
    }
}

exports.remove = async (req, res) => {
    try {
        const { id } = req.params
        const product = await prisma.product.findFirst({
            where: { id: Number(id) },
            include: { images: true }
        })
        if (!product) {
            return res.status(400).json({ message: 'Product not found!!' })
        }
        const deletedImage = product.images
        .map((image)=>
        new Promise((resolve,reject)=>{
            cloudinary.uploader.destroy(image.public_id,(error,result)=>{
                if(error) reject(error)
                else resolve(result)
            })
        })
        )
        await Promise.all(deletedImage)
        await prisma.product.delete({
            where: {
                id: Number(id)
            }
        })

        res.send('Deleted Success')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}

exports.listby = async (req, res) => {
    try {
        const { sort, order, limit } = req.body
        console.log(sort, order, limit)
        const products = await prisma.product.findMany({
            take: limit,
            orderBy: { [sort]: order },
            include: {
                category: true,
                images: true
            }
        })
        res.send(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

const handleQuery = async (req, res, query) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                title: {
                    contains: query,
                }
            },
            include: {
                category: true,
                images: true
            }

        })
        res.send(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Search Error" })
    }
}
const handlePrice = async (req, res, priceRange) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                price: {
                    gte: priceRange[0],
                    lte: priceRange[1]
                }
            },
            include: {
                category: true,
                images: true
            }
        })
        res.send(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error ' })
    }
}
const handleCategory = async (req, res, categoryId) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                categoryId: {
                    in: categoryId.map((id) => Number(id))
                }
            },
            include: {
                category: true,
                images: true
            }
        })
        res.send(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error ' })
    }
}

exports.searchFilters = async (req, res) => {
    try {
        const { query, category, price } = req.body

        if (query) {
            console.log('query-->', query)
            await handleQuery(req, res, query)
        }
        if (category) {
            console.log('category-->', category)
            await handleCategory(req, res, category)
        }
        if (price) {
            console.log('price-->', price)
            await handlePrice(req, res, price)
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}



// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});



exports.uploadImages = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.body.image,{
            public_id: `${Date.now()}`,
            resource_type:'auto',
            folder:'Ecom'
        })
        res.send(result)
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}
exports.removeImage = async (req, res) => {
    try {
        const {public_id} = req.body
        console.log(public_id)
        cloudinary.uploader.destroy(public_id,()=>{
            res.send('Remove Images')
        })
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}