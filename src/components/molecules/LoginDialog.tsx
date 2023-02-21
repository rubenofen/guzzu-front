import { useCallback, useContext, useRef, useState } from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { DialogsContext } from 'src/context/DialogsContext'
import * as yup from 'yup'
import { Button } from '../atoms/Button'
import { Dialog } from '../atoms/Dialog'

const schema = yup.object().shape({
  email: yup.string().email()
})

type FormErrors = { email?: string; generalError?: string }

export const LoginDialog = () => {
  const [validForm, setValidForm] = useState(false)
  const [formErrors, setFormErrors] = useState<FormErrors>()
  const [loading, setLoading] = useState<boolean>(false)
  const refEmail = useRef<HTMLInputElement>(null)
  const { loginDialogIsOpen, setLoginDialogIsOpen, setSignUpDialogIsOpen } = useContext(DialogsContext)

  const validateMail = useCallback(() => {
    const email = refEmail.current?.value
    schema.isValid({ email }).then((valid) => {
      setValidForm(valid)
    })
  }, [])

  const register = async () => {
    setFormErrors(undefined)
    const email = refEmail.current?.value
    if (email && validForm) {
      setLoading(true)
      try {
      } catch (e: any) {
        setFormErrors({ generalError: e.message })
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Dialog
      isOpen={loginDialogIsOpen}
      setIsOpen={setLoginDialogIsOpen}
      title="LOGIN"
      description="Connect with your email and we will send you a magic link."
      className="flex flex-col gap-y-4"
    >
      <input type="text" onChange={validateMail} ref={refEmail} placeholder="EMAIL"></input>
      <div className="flex justify-between items-end">
        <div className="text-xs">
          <span className="text-gray-500">NO ACCOUNT YET?</span>{' '}
          <a
            className="cursor-pointer underline"
            onClick={() => {
              setLoginDialogIsOpen(false)
              setSignUpDialogIsOpen(true)
            }}
          >
            SIGN UP
          </a>
        </div>
        <Button
          className="btn-secondary btn-big"
          icon={<AiOutlineArrowRight />}
          disabled={!validForm}
          loading={loading}
          onClick={register}
        >
          SEND
        </Button>
      </div>
      <div className="text-xs text-red-500">{formErrors?.generalError}</div>
    </Dialog>
  )
}
