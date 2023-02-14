import Link from 'next/link'
import { useCallback, useContext, useRef, useState } from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import API from 'src/api'
import { DialogsContext } from 'src/context/DialogsContext'
import { RegisterUserWithMagicLink, useUserDispatcher } from 'src/context/UserContext'
import * as yup from 'yup'
import { Button } from '../atoms/Button'
import { Dialog } from '../atoms/Dialog'

type FormErrors = { email?: string; generalError?: string }

export const SignUpDialog = () => {
  const [validForm, setValidForm] = useState<boolean>(false)
  const [validUserName, setValidUserName] = useState<boolean | undefined>(undefined)
  const [formErrors, setFormErrors] = useState<FormErrors>()
  const [loading, setLoading] = useState<boolean>(false)

  const refEmail = useRef<HTMLInputElement>(null)
  const refName = useRef<HTMLInputElement>(null)
  const refUserName = useRef<HTMLInputElement>(null)
  const refAll = useRef<HTMLInputElement>(null)
  const refTerms = useRef<HTMLInputElement>(null)
  const refPrivacy = useRef<HTMLInputElement>(null)
  const refSubscription = useRef<HTMLInputElement>(null)
  const userDispatcher = useUserDispatcher()
  const { signUpDialogIsOpen, setLoginDialogIsOpen, setSignUpDialogIsOpen } = useContext(DialogsContext)

  const checkUserName = () => {
    const username = refUserName.current?.value
    if (!username) setValidUserName(undefined)
    else if (username.length < 5) setValidUserName(false)
    else
      API.user.checkUserName(username).then((response) => {
        setValidUserName(!response.result)
      })
  }

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    username: yup
      .string()
      .min(5)
      .required()
      .test('validate-username', 'Username already exists', () => validUserName || false),
    terms: yup.boolean().oneOf([true], 'You must accept all terms and conditions'),
    privacy: yup.boolean().oneOf([true], 'You must accept privacy policy')
  })

  const validateForm = useCallback(async () => {
    const email = refEmail.current?.value
    const mameOfTheUser = refName.current?.value
    const username = refUserName.current?.value
    const all = refAll.current?.checked
    const terms = refTerms.current?.checked
    const privacy = refPrivacy.current?.checked
    const subscription = refSubscription.current?.checked

    if (!(email && username && terms && privacy)) setValidForm(false)
    else {
      const valid = await schema.isValid({
        email,
        username,
        name: { mameOfTheUser },
        all,
        terms,
        privacy,
        subscription
      })
      setValidForm(valid)
    }
  }, [schema])

  const subscribeToNewsletter = async (): Promise<void> => {
    const email = refEmail.current?.value
    if (email) await API.user.suscribeNewsletter(email)
  }

  const register = async () => {
    setFormErrors(undefined)
    const email = refEmail.current?.value || ''
    const name = refName.current?.value || ''
    const username = refUserName.current?.value || ''
    const newsletter = refSubscription.current?.checked || false
    if (validForm) {
      setLoading(true)
      try {
        userDispatcher(await RegisterUserWithMagicLink(email, name, username))
        if (newsletter) {
          await subscribeToNewsletter()
        }
      } catch (e: any) {
        setFormErrors({ generalError: e.message })
      } finally {
        setLoading(false)
      }
    }
  }

  const selectAll = () => {
    const all = refAll.current?.checked
    if (all) {
      if (!refTerms.current?.checked) refTerms.current?.click()
      if (!refPrivacy.current?.checked) refPrivacy.current?.click()
      if (!refSubscription.current?.checked) refSubscription.current?.click()
    }
  }

  return (
    <Dialog
      isOpen={signUpDialogIsOpen}
      setIsOpen={setSignUpDialogIsOpen}
      title="WELCOME"
      description="Fill in your details, and create an account with Guzzu. Enter the new era of Digital Merchandising."
      className="flex flex-col gap-y-7"
    >
      <form className="flex flex-col gap-y-4">
        <input onChange={validateForm} type="text" ref={refName} placeholder="NAME" />
        <div className="relative">
          <input
            type="text"
            onChange={() => {
              checkUserName()
              validateForm()
            }}
            ref={refUserName}
            placeholder="USERNAME"
            className="w-full"
          />
          {typeof validUserName !== 'undefined' && (
            <div
              className={`${
                validUserName ? 'bg-green-500' : 'bg-primary'
              } absolute right-4 top-3  text-white text-xs py-1 px-2 rounded-md`}
            >
              {`${validUserName ? 'AVAILABLE' : 'NOT AVAILABLE'}`}
            </div>
          )}
        </div>
        <input
          type="text"
          onChange={() => {
            validateForm()
          }}
          ref={refEmail}
          placeholder="EMAIL"
        />
        <div className="text-[10px] text-gray-500 uppercase">
          <input id="all" ref={refAll} onClick={selectAll} type="checkbox" />
          <label htmlFor="all">I accept all conditions and terms listed below.</label>
          <div>
            <input id="terms" ref={refTerms} type="checkbox" onChange={validateForm} />
            <label htmlFor="terms">
              I accept the <Link href="/terms">Terms and Conditions</Link>.
            </label>
          </div>
          <div>
            <input id="privacy" ref={refPrivacy} type="checkbox" onChange={validateForm} />
            <label htmlFor="privacy">
              I accept the <Link href="/privacy">Privacy Policy</Link>
            </label>
          </div>
          <div>
            <input id="subscription" ref={refSubscription} type="checkbox" />
            <label htmlFor="subscription">I accept the subscription to Guzzu&apos;s newsletter</label>
          </div>
        </div>
      </form>
      <div className="flex justify-between items-end">
        <div className="text-xs">
          <span className="text-gray-500">I HAVE AN ACCOUNT ALREADY</span>{' '}
          <a
            className="cursor-pointer underline"
            onClick={() => {
              setSignUpDialogIsOpen(false)
              setLoginDialogIsOpen(true)
            }}
          >
            LOGIN
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
