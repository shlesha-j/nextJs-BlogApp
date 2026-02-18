import EditBlogClient from "./EditBlogClient";

export default async function Page({ params }) {
  const { id } = await params;

  return (
    <section>
      <div className="container">
        <EditBlogClient id={id} />
      </div>
    </section>
  );
}
