import React from "react"

class ErrorBoundaries extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        console.log(error + " info : " + errorInfo)
    }
    render() {
        if (this.state.hasError) {
            return <h3>We have error here ! </h3>
        }
        else {
            return this.props.children
        }
    }
}


export default ErrorBoundaries