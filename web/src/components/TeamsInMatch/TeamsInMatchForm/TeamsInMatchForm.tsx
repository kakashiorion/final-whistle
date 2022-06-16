import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  Submit,
} from '@redwoodjs/forms'



const TeamsInMatchForm = (props) => {
  const onSubmit = (data) => {

  
    
    
  
    
    
  
    
    
  
    
    
  
    props.onSave(data, props?.teamsInMatch?.id)
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
          name="matchId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Match id
        </Label>
        
          <NumberField
            name="matchId"
            defaultValue={props.teamsInMatch?.matchId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="matchId" className="rw-field-error" />

        <Label
          name="teamId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Team id
        </Label>
        
          <NumberField
            name="teamId"
            defaultValue={props.teamsInMatch?.teamId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="teamId" className="rw-field-error" />

        <Label
          name="score"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Score
        </Label>
        
          <NumberField
            name="score"
            defaultValue={props.teamsInMatch?.score}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="score" className="rw-field-error" />

        <Label
          name="scoringPlayers"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Scoring players
        </Label>
        
          <NumberField
            name="scoringPlayers"
            defaultValue={props.teamsInMatch?.scoringPlayers}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="scoringPlayers" className="rw-field-error" />

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

export default TeamsInMatchForm
