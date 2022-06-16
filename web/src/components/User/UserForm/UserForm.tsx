import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  RadioField,
  Submit,
} from '@redwoodjs/forms'



const UserForm = (props) => {
  const onSubmit = (data) => {

  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    props.onSave(data, props?.user?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
      
        <Label
          name="username"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Username
        </Label>
        
          <TextField
            name="username"
            defaultValue={props.user?.username}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="username" className="rw-field-error" />

        <Label
          name="email"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email
        </Label>
        
          <TextField
            name="email"
            defaultValue={props.user?.email}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="email" className="rw-field-error" />

        <Label
          name="hashedPassword"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Hashed password
        </Label>
        
          <TextField
            name="hashedPassword"
            defaultValue={props.user?.hashedPassword}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="hashedPassword" className="rw-field-error" />

        <Label
          name="salt"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Salt
        </Label>
        
          <TextField
            name="salt"
            defaultValue={props.user?.salt}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="salt" className="rw-field-error" />

        <Label
          name="points"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Points
        </Label>
        
          <NumberField
            name="points"
            defaultValue={props.user?.points}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="points" className="rw-field-error" />

        <Label
          name="role"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Role
        </Label>
        
          
          
        <div className="rw-check-radio-items">
          <RadioField
            id="user-role-0"
            name="role"
            defaultValue="Gamer"
            defaultChecked={props.user?.role?.includes('Gamer')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>
            Gamer
          </div>
        </div>
          
        <div className="rw-check-radio-items">
          <RadioField
            id="user-role-1"
            name="role"
            defaultValue="Admin"
            defaultChecked={props.user?.role?.includes('Admin')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>
            Admin
          </div>
        </div>
          
        

        <FieldError name="role" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit
            disabled={props.loading}
            className="rw-button rw-button-blue"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default UserForm
