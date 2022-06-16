import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  DatetimeLocalField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'


const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}


const MatchForm = (props) => {
  const onSubmit = (data) => {

  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    props.onSave(data, props?.match?.id)
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
          name="location"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Location
        </Label>
        
          <TextField
            name="location"
            defaultValue={props.match?.location}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="location" className="rw-field-error" />

        <Label
          name="matchDate"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Match date
        </Label>
        
          <DatetimeLocalField
            name="matchDate"
            defaultValue={formatDatetime(props.match?.matchDate)}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="matchDate" className="rw-field-error" />

        <Label
          name="round"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Round
        </Label>
        
          <TextField
            name="round"
            defaultValue={props.match?.round}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="round" className="rw-field-error" />

        <Label
          name="tournamentId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Tournament id
        </Label>
        
          <NumberField
            name="tournamentId"
            defaultValue={props.match?.tournamentId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="tournamentId" className="rw-field-error" />

        <Label
          name="maxWagerLimit"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Max wager limit
        </Label>
        
          <NumberField
            name="maxWagerLimit"
            defaultValue={props.match?.maxWagerLimit}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="maxWagerLimit" className="rw-field-error" />

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

export default MatchForm
