import React, {Fragment} from 'react'
import ToolbarStyled from './style'
import Link from '../Link'
import Logotype from '../Logotype'
import Nickname from '../Nickname'
//<Link to="/login">Login</Link>
//<Link to="/registration">Registration</Link>
function Toolbar({ handleSidebar, auth }) {
    return (
        <ToolbarStyled>
            <div>
                <Logotype handleSidebar={handleSidebar} />
            </div>
            <div>
                {
                    auth
                    ? <Nickname />
                    : <Fragment><Link to="/login">Login</Link><Link to="/registration">Registration</Link></Fragment>
                }
            </div>

        </ToolbarStyled>
    )
}
export default Toolbar