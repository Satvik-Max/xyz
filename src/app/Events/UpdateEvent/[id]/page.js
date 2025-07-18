import UpdateEventComp  from "@/components/Events/UpdateEventComp";
import React from "react";

const UpdateEvent = async ({ params }) => {
  const { id } = await params;
  return (
    <div>
      <UpdateEventComp id={id} />
    </div>
  );
};

export default UpdateEvent;
