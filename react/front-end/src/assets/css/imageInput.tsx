interface ImageInputParams {
  URL: string;
}

const ImageInput = ({}: ImageInputParams) => {

  const handleSubmit = () => {

  }

  const handleChange = () => {

  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleChange} />
    </form>
  )
}