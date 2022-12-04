import { Typography } from "@mui/material";

import { Report } from "../interfaces";

type Props = {
    report: Report;
}

export const Info = ({ report }: Props) => {
    return (
        <>
            <Typography>
                <strong>Vuelo: &nbsp;</strong>
                {report.flight}
            </Typography>
            <Typography>
                <strong>Aerolínea: &nbsp;</strong>
                {report.airline}
            </Typography>
            <Typography>
                <strong>Aeropuerto: &nbsp;</strong>
                {report.airport}
            </Typography>
            <Typography>
                <strong>{report.city.type}: &nbsp;</strong>
                {report.city.name}
            </Typography>
            <Typography>
                <strong>{report.division.type}: &nbsp;</strong>
                {report.division.name}
            </Typography>
            <Typography>
                <strong>{report.country.type}: &nbsp;</strong>
                {report.country.name}
            </Typography>
            <Typography>
                <strong>Fecha: &nbsp;</strong>
                {report.date}
            </Typography>
            <Typography>
                <strong>Piloto: &nbsp;</strong>
                {report.pilot}
            </Typography>
        </>
    )
}
