import React from 'react'
import { Collapse, Checkbox } from 'antd';
const { Panel } = Collapse;

function CheckBox(props) {
    console.log(props.list)
    const renderCheckBoxLists = () => props.list && props.list.map((value, index)=> (
        <React.Fragment key={index}>
            <CheckBox>
                <span>{value.name}</span>
            </CheckBox>
        </React.Fragment>
    ))

    return (
        <div>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="This is panel header 1" key="1">
                    {renderCheckBoxLists()}                    
                </Panel>            
            </Collapse>
        </div>  
    )
}

export default CheckBox