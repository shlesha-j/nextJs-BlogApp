import { use } from "react";
import EditBlogClient from "./EditBlogClient";

export default function Page(props) {
  const { id } = use(props.params); // unwrapping params
  return (
    <section>
        <div className="container editblog-page">
            <EditBlogClient id={id} />
        </div>
    </section>
  
)
}
