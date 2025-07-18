import { useState, useMemo } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import Link from "next/link";
import ReadUpdateDeleteBtn from "./ReadUpdateDeleteBtn";
import TeamDetailsModal from "../Modals/TeamDetailsModal";
import toast from "react-hot-toast";
import { handleExport } from "@/Function/DownloadRecords";
import { Download } from "lucide-react";

export default function MUITable({
  type,
  data = [],
  exclude = [],
  getDatafun,
  read,
  update,
  deleteitem,
  collectionID,
  updateField,
  tableHeight = 650,
  viewMembers,
  seeDetails,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [claimedLoad, setClaimedLoad] = useState({ id: "", loading: false });

  if (!data.length) {
    return (
      <Typography variant="h6" textAlign="center" sx={{ marginTop: 4 }}>
        No data available
      </Typography>
    );
  }

  const headers = useMemo(
    () => Object.keys(data[0]).filter((header) => !exclude.includes(header)),
    [data, exclude]
  );

  const filteredData = useMemo(
    () =>
      data.filter((row) =>
        headers.some((header) =>
          String(row[header] || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      ),
    [data, headers, searchTerm]
  );

  const handleToggle = async (id, currentValue, row) => {
    setClaimedLoad({ id, loading: true });
    try {
      await updateField(id, !currentValue, row);
      getDatafun && getDatafun();
    } catch (error) {
      console.error("Failed to update field:", error);
    } finally {
      setClaimedLoad({ id: "", loading: false });
    }
  };

  const [downloading, setdownloading] = useState(false);
  const handleDownload = () => {
    try {
      setdownloading(true);
      const result = handleExport(filteredData, "Records");
      console.log(result);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setdownloading(false);
    }
  };
  return (
    <Paper sx={{ boxShadow: "none", borderRadius: 3, marginTop: 5 }}>
      <Box className="flex gap-2 items-center justify-center">
        <TextField
          label="Search"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ backgroundColor: "white", borderRadius: 1 }}
        />
        <button onClick={handleDownload} className="text-white bg-red-500 p-2 rounded-md" >
          {downloading ? "Downloading..." : "Download"}
        </button>
      </Box>

      <TableContainer sx={{ maxHeight: tableHeight, marginTop: 2 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>SN</TableCell>
              {headers.map((column) => (
                <TableCell key={column} sx={{ fontWeight: "bold" }}>
                  {column}
                </TableCell>
              ))}
              {(getDatafun || seeDetails) && (
                <TableCell sx={{ fontWeight: "bold" }}>Options</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, rowIndex) => (
              <TableRow hover key={row.$id || rowIndex}>
                <TableCell>{rowIndex + 1}</TableCell>
                {headers.map((header) => (
                  <TableCell key={`${rowIndex}-${header}`}>
                    {header === "isClaimed" ? (
                      <button
                        disabled={row[header]}
                        className={`bg-red-500 text-white p-2 rounded-md ${
                          row[header] || claimedLoad.id === row.$id
                            ? "bg-red-300"
                            : ""
                        }`}
                        onClick={() => handleToggle(row.$id, row[header], row)}
                      >
                        {claimedLoad.id === row.$id
                          ? "Loading..."
                          : row[header]
                            ? "Claimed"
                            : "Not Claimed"}
                      </button>
                    ) : header === "PublicURL" ? (
                      <Link
                        href={row[header]}
                        className="p-2 border border-red-400 rounded-md bg-red-100"
                      >
                        Profile
                      </Link>
                    ) : header === "amount" ? (
                      (row[header] / 100).toFixed(2)
                    ) : header === "isInside" ? (
                      <button className="p-2 border border-red-400 rounded-md bg-red-200">
                        {row[header] ? "Inside" : "Outside"}
                      </button>
                    ) : header === "isAttend" ? (
                      <button
                        disabled
                        className={`p-2 border border-red-400 rounded-md ${row[header] ? "bg-blue-600" : "bg-red-400"}  text-white`}
                      >
                        {row[header] ? "Present" : "Absent"}
                      </button>
                    ) : (
                      row[header]
                    )}
                  </TableCell>
                ))}

                {(getDatafun || viewMembers) && (
                  <TableCell>
                    {getDatafun && (
                      <ReadUpdateDeleteBtn
                        read={read}
                        deleteitem={deleteitem}
                        update={update}
                        type={type}
                        id={row.$id}
                        getDatafun={getDatafun}
                        collectionID={collectionID}
                      />
                    )}
                    {viewMembers && <TeamDetailsModal teamData={row} />}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {!filteredData.length && (
        <Typography
          variant="body1"
          textAlign="center"
          sx={{ padding: 2, color: "#f44336" }}
        >
          No data found
        </Typography>
      )}
    </Paper>
  );
}
