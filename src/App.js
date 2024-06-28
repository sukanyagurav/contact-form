import {z} from "zod";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
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

  const {register,handleSubmit,formState:{errors}} = useForm({resolver:zodResolver(schema)})
  
  function submitData(data){
    console.log(data)
  }
  return (
    <main>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit(submitData)}>
        <div className="form__fields">

            <div className="form__field">
              <label htmlFor="firstName">First Name <sup>*</sup></label>
              <input type="text" id="firstName" 
              {...register("firstName",{required:true})}/>
              {errors.firstName && <span >{errors.firstName.message}</span>}
            </div>

            <div className="form__field">
              <label htmlFor="lastName">Last Name <sup>*</sup></label>
              <input type="text" id="lastName"  {...register("lastName")} />
              {errors.lastName && <span >{errors.lastName.message}</span>}

            </div>
        </div>

        <div className="form__field">

          <label htmlFor="email">Email Address <sup>*</sup></label>
          <input type="email" id="email"  {...register("email")} />
          {errors.email && <span >{errors.email.message}</span>}
        </div>

        <div className="form__field">
          <label >Query Type <sup>*</sup></label>
          <input type="radio" name="type"  value="general_enquiry"
           id="general_enquiry" {...register("type")} />
          <label htmlFor="general_enquiry">General Enquiry</label>
          <input type="radio" name="type" id="support_request"
           value="support_request" {...register("type")} />
          <label htmlFor="support_request">Support Request</label>
          {errors.type && (
            <span>{errors.type.message}</span>
          )}
        </div>
        <div className="form__field">
          <label htmlFor="message">Message <sup>*</sup></label>
          <textarea id="message"  {...register("message")}></textarea>
          {errors.message && <span >{errors.message.message}</span>}
        </div>
        <div className="form__field">
          <input type="checkbox"  id="consent"  {...register("consent")}/>
          <label htmlFor="consent">I consent to being contacted by the team <sup>*</sup></label>
          {errors.consent && <span >{errors.consent.message}</span>}
        </div>
        <button>Submit</button>
      </form>
    </main>
  );
}

export default App;
