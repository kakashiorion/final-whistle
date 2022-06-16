import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  Submit,
} from '@redwoodjs/forms'



const MatchPredictionForm = (props) => {
  const onSubmit = (data) => {

  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    props.onSave(data, props?.matchPrediction?.id)
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
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>
        
          <NumberField
            name="userId"
            defaultValue={props.matchPrediction?.userId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="userId" className="rw-field-error" />

        <Label
          name="matchId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Match id
        </Label>
        
          <NumberField
            name="matchId"
            defaultValue={props.matchPrediction?.matchId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="matchId" className="rw-field-error" />

        <Label
          name="predictedScoreOfTeam1"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Predicted score of team1
        </Label>
        
          <NumberField
            name="predictedScoreOfTeam1"
            defaultValue={props.matchPrediction?.predictedScoreOfTeam1}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="predictedScoreOfTeam1" className="rw-field-error" />

        <Label
          name="predictedScoreOfTeam2"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Predicted score of team2
        </Label>
        
          <NumberField
            name="predictedScoreOfTeam2"
            defaultValue={props.matchPrediction?.predictedScoreOfTeam2}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="predictedScoreOfTeam2" className="rw-field-error" />

        <Label
          name="predictedScoringPlayersOfTeam1"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Predicted scoring players of team1
        </Label>
        
          <NumberField
            name="predictedScoringPlayersOfTeam1"
            defaultValue={props.matchPrediction?.predictedScoringPlayersOfTeam1}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="predictedScoringPlayersOfTeam1" className="rw-field-error" />

        <Label
          name="predictedScoringPlayersOfTeam2"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Predicted scoring players of team2
        </Label>
        
          <NumberField
            name="predictedScoringPlayersOfTeam2"
            defaultValue={props.matchPrediction?.predictedScoringPlayersOfTeam2}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="predictedScoringPlayersOfTeam2" className="rw-field-error" />

        <Label
          name="wageredPoints"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Wagered points
        </Label>
        
          <NumberField
            name="wageredPoints"
            defaultValue={props.matchPrediction?.wageredPoints}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="wageredPoints" className="rw-field-error" />

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

export default MatchPredictionForm
