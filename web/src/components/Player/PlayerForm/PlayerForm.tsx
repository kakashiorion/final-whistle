import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'



const PlayerForm = (props) => {
  const onSubmit = (data) => {

  
    
    
  
    
    
  
    
    
  
    props.onSave(data, props?.player?.id)
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
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>
        
          <TextField
            name="name"
            defaultValue={props.player?.name}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="position"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Position
        </Label>
        
          <TextField
            name="position"
            defaultValue={props.player?.position}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="position" className="rw-field-error" />

        <Label
          name="teamId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Team id
        </Label>
        
          <NumberField
            name="teamId"
            defaultValue={props.player?.teamId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="teamId" className="rw-field-error" />

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

export default PlayerForm
