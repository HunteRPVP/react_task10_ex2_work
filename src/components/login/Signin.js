import React, { Component } from 'react'
import { Button } from '@material-ui/core'

export class Signin extends Component {
    render() {
        return (
            <div>
                Signin
                <Button variant="outlined" onClick={() => this.props.history.push("/lk/step1")}>Войти в личный кабинет</Button>
            </div>
        )
    }
}

export default Signin
