import React, { Component } from 'react'
import { Button } from '@material-ui/core'

export class Signup extends Component {
    render() {
        return (
            <div>
                Signup
                <Button variant="outlined" onClick={() => this.props.history.push("/lk/step1")}>Зарегистрироваться</Button>
            </div>
        )
    }
}

export default Signup
