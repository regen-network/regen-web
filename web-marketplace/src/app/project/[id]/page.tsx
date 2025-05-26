interface ProjectPageProps {
  params: { id: string };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  // const project = await getProject(params.id);

  return (
    <div>
      <h1>{params.id}</h1>
    </div>
  );
}
