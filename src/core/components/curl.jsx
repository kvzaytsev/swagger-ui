import React from "react"
import PropTypes from "prop-types"
import curlify from "core/curlify"
import {connect} from "react-redux"

class Curl extends React.Component {
  static propTypes = {
    request: PropTypes.object.isRequired
  }

  handleFocus(e) {
    e.target.select()
    document.execCommand("copy")
  }

  render() {
    let { request, curlUrl } = this.props
    console.log(curlUrl, '-------------------------------')
    let curl = curlify(request, curlUrl)

    return (
      <div>
        <h4>Curl</h4>
        <div className="copy-paste">
          <textarea onFocus={this.handleFocus} readOnly="true" className="curl" style={{ whiteSpace: "normal" }} value={curl}></textarea>
        </div>
      </div>
    )
  }

}

export default connect((state) => {
  const c = state.get('curlUrl')
  return {curlUrl: c.get('url') }
})(Curl)
