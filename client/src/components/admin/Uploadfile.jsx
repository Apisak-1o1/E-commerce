import React, { useState } from "react";
import { toast } from "react-toastify";
import Resize from "react-image-file-resizer";
import { removeFiles, uploadFiles } from "../../api/Product";
import useEcomStore from "../../store/ecom-store";
const Uploadfile = ({ form, setForm }) => {
  const token = useEcomStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);
  const handleOnChange = (e) => {
    const files = e.target.files;
    if (files) {
      setIsLoading(true);
      let allFiles = form.images;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith("image/")) {
          toast.error(`File ${file.name} is not image`);
          continue;
        }
        Resize.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (data) => {
            uploadFiles(token, data)
              .then((res) => {
                console.log(res);
                allFiles.push(res.data);
                setForm({
                  ...form,
                  images: allFiles,
                });
                toast.success("Upload Image Success");
              })
              .catch((err) => {
                console.log(err);
              });
          },
          "base64"
        );
      }
    }
  };
  const handleDelete = async (public_id)=>{
    const images = form.images
    removeFiles(token, public_id)
    .then((res)=>{
        toast.success('Remove image success')
        const filterImages = images.filter((item)=>{
            return item.public_id !== public_id
        })
        setForm({
            ...form,
            images: filterImages
        })
    })
    .catch((err)=>{
        toast.error(err)
    })
  }

  return (
    <div className="my-4">
      <div className="flex mx-4 gap-4 my-4">
        {
            form.images.map((item,index)=>
                <div className="relative" key={index}>
                    <img src={item.url} className="w-24 h-24"/>
                    <span
                    className="absolute top-0 right-0 bg-red-500 p-1 rounded-md"
                    onClick={()=>handleDelete(item.public_id)}
                    >X</span>

                </div>
            )
        }
      </div>
      <div>
        <input type="file" onChange={handleOnChange} name="images" multiple />
      </div>
    </div>
  );
};

export default Uploadfile;
