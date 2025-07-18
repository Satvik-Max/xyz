import UpdateBlogComp from "@/components/Blogs/UpdateBlogComp";
import React from "react";

const UpdateBlog = async ({ params }) => {
  const { id } = await params;
  return (
    <div>
      <UpdateBlogComp id={id} />
    </div>
  );
};

export default UpdateBlog;
