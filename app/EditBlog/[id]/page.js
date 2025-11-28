import { use } from "react";
import EditBlogClient from "./EditBlogClient";

export default function Page(props) {
  const { id } = use(props.params); 
  return (
    <section>
        <div className="container">
            <EditBlogClient id={id} />
        </div>
    </section>
  
)
}
