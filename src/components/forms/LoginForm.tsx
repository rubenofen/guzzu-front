import { useCallback, useRef, useState } from 'react'
import * as yup from 'yup'

let schema = yup.object().shape({
  email: yup.string().email()
})

export const LoginForm = () => {
  const [validForm, setValidForm] = useState(false)
  const refEmail = useRef<HTMLInputElement>(null)

  const validateMail = useCallback(() => {
    const email = refEmail.current?.value
    schema.isValid({ email }).then((valid) => {
      setValidForm(valid)
    })
  }, [])

  return (
    <div className="flex flex-col">
      <h3>Inicia sesión o regístrate</h3>
      <p className="mt-5">
        Descubre cómo se vive en ese piso antes de entrar a vivir en él y ayuda a otras personas en su proceso de
        búsqueda compartiendo tu experiencia.
      </p>
      <label htmlFor="email" className="mt-10">
        Correo electrónico
      </label>
      <input
        onChange={validateMail}
        ref={refEmail}
        placeholder="Escribe tu dirección de correo"
        id="email"
        type="text"
      />
      <button className="btn btn-primary self-end mt-8" disabled={!validForm}>
        Continuar
      </button>
    </div>
  )
}
