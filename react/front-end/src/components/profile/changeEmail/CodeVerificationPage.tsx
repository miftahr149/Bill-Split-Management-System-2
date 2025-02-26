const dummyEmail = "AsepKesepian2@gmail.com";

const CodeVerificationPage = () => {
  const sensorEmail = (email: string) => {
    const emailLength = email.length;
    const charArray = email.split('');
    const sensorCharArray = charArray.map((value, index) => {
      if (index <= 2 || (index >= emailLength - 3)) return value;
      return '*';
    })
    return sensorCharArray.join('');
  }

  return (
    <div className="d-flex flex-column m-5 px-5 flex-grow-1 gap-4">
      <p className="fs-3">The verification code is sent to {sensorEmail(dummyEmail)} </p>
    </div>
  )
}

export default CodeVerificationPage;