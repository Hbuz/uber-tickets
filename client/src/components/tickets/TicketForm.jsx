// import React, { PureComponent } from 'react'
// import { withStyles } from '@material-ui/core/styles'
// import TextField from '@material-ui/core/TextField'
// import Grid from '@material-ui/core/Grid'
// import Button from '@material-ui/core/Button'

// const styles = (theme) => ({
//   container: {
//     flexWrap: 'wrap'
//   },
//   textField: {
//     marginLeft: theme.spacing.unit,
//     marginRight: theme.spacing.unit,
//     width: 200,
//   }
// })


// const TicketForm = withStyles(styles)(
//   class extends PureComponent {

//     state = {}

//     render() {
//       return (
//         <form className={this.props.classes.container} noValidate autoComplete="off" onSubmit={this.props.handleSubmit} >
//           <Grid container direction="column">
//             <Grid item>
//               <Grid container direction="column">
//                 <TextField
//                   id="standard-price"
//                   label="Price"
//                   className={this.props.classes.textField}
//                   value={this.state.price}
//                   onChange={this.props.handleChange('price')}
//                   margin="normal"
//                 />
//                 <TextField
//                   id="standard-description"
//                   label="Description"
//                   className={this.props.classes.textField}
//                   value={this.state.description}
//                   onChange={this.props.handleChange('description')}
//                   margin="normal"
//                 />
//                 <input type="file"
//                   id="standard-picture"
//                   accept="image/png, image/jpeg, image/jpg"
//                   value={this.state.picture}
//                   onChange={this.props.handleChange('picture')}
//                 />
//               </Grid>
//             </Grid>
//             <Grid item>
//               <Button type="submit">CREATE TICKET</Button>
//             </Grid>
//           </Grid>
//         </form>
//       )
//     }
//   })

// export default TicketForm