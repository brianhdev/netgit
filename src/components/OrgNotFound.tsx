import React from "react"

import Typography from "@mui/material/Typography"
import Box from "@mui/system/Box";

interface OrgNotFoundProps {
  orgname: string,
  isEmpty: boolean
}

const OrgNotFound: React.FC<OrgNotFoundProps> = (props: OrgNotFoundProps) => {
  return (
    <Box sx={{
      height: '100%',
      width: '100%'
    }}>
      <Typography variant="h4" sx={{textAlign: 'center', mt: '20vh'}}>
        We're sorry :(
      </Typography>
      <img
        style={{ display: 'block', margin: '20px auto', borderRadius: 20}}
        width='60%'
        src="https://raw.githubusercontent.com/BrianGHong/p-mock-api/main/api/img/sadpikachu-2.jpeg"
        alt=":("
      />
      <Typography variant="subtitle1" sx={{textAlign: 'center',  mb: '20vh' }}>
        {
          props.isEmpty ?
          (<React.Fragment>
            We were able to find the organization '<a href={`https://github.com/orgs/${props.orgname}`} target="_blank" rel="noreferrer">{props.orgname}</a>', however it seems to be empty.
          </React.Fragment>) :
          (`We were unable to find a GitHub page for the organization '${props.orgname}'. \n Please don't hurt me`)
        }
      </Typography>
    </Box>
  );
}

export default OrgNotFound;
