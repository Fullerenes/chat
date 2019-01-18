import React from 'react'
import { Tabs as TabsRow, Tab as TabStyled, Close } from './style'
function Tabs({ children, ...props }) {
    return (
        <TabsRow {...props}>
            {children}
        </TabsRow>
    )
}
function Tab({ children, handleClose, closeLink, ...props }) {
    return (
        <TabStyled {...props}>
            {children}
            <Close onClick={handleClose} to={closeLink} />
        </TabStyled>
    )
}
export default Tabs;
export { Tab };