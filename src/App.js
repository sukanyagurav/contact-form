import {z} from "zod";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import succeses from './assets/images/icon-success-check.svg'
import { Toaster, toast } from 'sonner'


function App() {
  const schema = z.object({
    firstName:z.string().min(2,{ message:'First Name should have at least 2 characters'}),
    lastName:z.string().min(2,{message:'Last Name should have at least 2 characters'}),
    email:z.string().email({message:'Looks like you entered invalid email'}),
    message:z.string().min(2,{message:'Please enter a message'}),
    consent:z.literal(true,{
      errorMap: () => ({ message: "You must accept the terms & conditions" }),
    }),
    type: z.string({message:'Please select a query type!'}).refine(val=> ['general_enquiry','support_request'].includes(val)),
  })

  const {register,handleSubmit,formState:{errors},reset} = useForm({resolver:zodResolver(schema)})

  
  function submitData(){

    toast.custom((t) => (
      <div>
       <p className="flex-row"><img src={succeses} /> Message sent </p>
       <p>Thanks for completing the form. we'll be in touch soon!</p>
      </div>
    ));
    reset()
  }
  return (
    <main>

      <h1>Contact Us</h1>
      <Toaster  position="top-center"  toastOptions={{
         className:'toast'
      }} />
      <form onSubmit={handleSubmit(submitData)} autocomplete="off">
        <div className="form__fields">

            <div className="form__field">
              <label htmlFor="firstName">First Name <sup>*</sup></label>
              <input type="text" id="firstName" 
              {...register("firstName",{required:true})} autocomplete="off"/>
              {errors.firstName && <span className="error" >{errors.firstName.message}</span>}
            </div>

            <div className="form__field">
              <label htmlFor="lastName">Last Name <sup>*</sup></label>
              <input type="text" id="lastName"  {...register("lastName")}  autocomplete="off"/>
              {errors.lastName && <span   className="error">{errors.lastName.message}</span>}

            </div>
        </div>

        <div className="form__field">

          <label htmlFor="email">Email Address <sup>*</sup></label>
          <input type="email" id="email"  {...register("email")} autocomplete="off" />
          {errors.email && <span   className="error">{errors.email.message}</span>}
        </div>

        <div className="query_type">
          <span className="title">Query Type <sup>*</sup></span>
          <div className="form__fields">
            <div className="form__field flex-row">
               <input type="radio" name="type"  value="general_enquiry"
                id="general_enquiry" {...register("type")} />
                <span className="custom__radio"></span>
              <label htmlFor="general_enquiry">General Enquiry</label>
            </div>
            <div className="form__field flex-row">
                <input type="radio" name="type" id="support_request"
                  value="support_request" {...register("type")} />
                   <span className="custom__radio"></span>
                  <label htmlFor="support_request">Support Request</label>
            </div>
          </div>
          {errors.type && (
            <span  className="error">{errors.type.message}</span>
          )}
        </div>
        <div className="form__field">
          <label htmlFor="message">Message <sup>*</sup></label>
          <textarea id="message"  {...register("message")}/>
          {errors.message && <span   className="error">{errors.message.message}</span>}
        </div>
        <div className="term">
        <div className="flex-row">
        <input type="checkbox"  id="consent"  {...register("consent")}/>
          <span className="custom__checkbox"></span>
          <label htmlFor="consent">I consent to being contacted by the team <sup>*</sup></label>
        </div>
         
          {errors.consent && <span  className="error" >{errors.consent.message}</span>}
        </div>
        <button className="btn">Submit</button>
      </form>
    </main>
  );
}

export default App;
