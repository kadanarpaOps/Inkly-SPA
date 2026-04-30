interface Props {
  statusCode: number,
  messageError: string,
}

function ErrorPage ({messageError, statusCode}: Props) {
  return (
    <div className='grid content-center h-screen text-center'>
      <h3 className='text-xl'>{messageError.toLocaleUpperCase()}</h3>
      <h1 className='text-9xl'>{statusCode}</h1>
    </div>
  )
}

export default ErrorPage