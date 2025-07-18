import React, { useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const teamsData = [
  {
    teamName: "Code Warriors",
    leader: {
      name: "Gaurav Narnaware",
      email: "http://garav@gmail.com",
      college: "GCOE Nagpur",
      year: "3rd",
      department: "Computer Science",
    },
    members: [
      { name: "Bob Smith", email: "gauav@gmail.com" },
      { name: "Charlie Brown", email: "charlie@example.com" },
      { name: "Diana Prince", email: "diana@example.com" },
    ],
    present: false,
  },
  {
    teamName: "Innovators",
    leader: {
      name: "Eve Adams",
      email: "eve@example.com",
      college: "IIT Bombay",
      year: "2nd",
      department: "Electronics",
    },
    members: [
      { name: "Frank Castle", email: "frank@example.com" },
      { name: "Grace Hopper", email: "grace@example.com" },
      { name: "Hank Pym", email: "hank@example.com" },
    ],
    present: false,
  },
  {
    teamName: "Tech Titans",
    leader: {
      name: "Isaac Newton",
      email: "isaac@example.com",
      college: "MIT",
      year: "4th",
      department: "Mechanical Engineering",
    },
    members: [
      { name: "John Locke", email: "john@example.com" },
      { name: "Jane Austen", email: "jane@example.com" },
      { name: "Mark Twain", email: "mark@example.com" },
    ],
    present: false,
  },
  {
    teamName: "Digital Dreamers",
    leader: {
      name: "Luna Lovegood",
      email: "luna@example.com",
      college: "Stanford University",
      year: "1st",
      department: "Information Technology",
    },
    members: [
      { name: "Harry Potter", email: "harry@example.com" },
      { name: "Hermione Granger", email: "hermione@example.com" },
      { name: "Ron Weasley", email: "ron@example.com" },
    ],
    present: false,
  },
  {
    teamName: "AI Mavericks",
    leader: {
      name: "Alan Turing",
      email: "alan@example.com",
      college: "Cambridge University",
      year: "3rd",
      department: "Artificial Intelligence",
    },
    members: [
      { name: "Ada Lovelace", email: "ada@example.com" },
      { name: "Charles Babbage", email: "charles@example.com" },
      { name: "Claude Shannon", email: "claude@example.com" },
    ],
    present: false,
  },
  {
    teamName: "NextGen Coders",
    leader: {
      name: "Elon Musk",
      email: "elon@example.com",
      college: "University of Pretoria",
      year: "2nd",
      department: "Engineering",
    },
    members: [
      { name: "Jeff Bezos", email: "jeff@example.com" },
      { name: "Steve Jobs", email: "steve@example.com" },
      { name: "Bill Gates", email: "bill@example.com" },
    ],
    present: false,
  },
  {
    teamName: "Cyber Crusaders",
    leader: {
      name: "Marie Curie",
      email: "marie@example.com",
      college: "Sorbonne University",
      year: "4th",
      department: "Physics",
    },
    members: [
      { name: "Albert Einstein", email: "albert@example.com" },
      { name: "Nikola Tesla", email: "nikola@example.com" },
      { name: "Niels Bohr", email: "niels@example.com" },
    ],
    present: false,
  },
  {
    teamName: "Quantum Quants",
    leader: {
      name: "Richard Feynman",
      email: "richard@example.com",
      college: "Caltech",
      year: "3rd",
      department: "Quantum Computing",
    },
    members: [
      { name: "Max Planck", email: "max@example.com" },
      { name: "Erwin Schrödinger", email: "erwin@example.com" },
      { name: "Paul Dirac", email: "paul@example.com" },
    ],
    present: false,
  },
  {
    teamName: "Data Wizards",
    leader: {
      name: "Tim Berners-Lee",
      email: "tim@example.com",
      college: "Oxford University",
      year: "4th",
      department: "Data Science",
    },
    members: [
      { name: "Larry Page", email: "larry@example.com" },
      { name: "Sergey Brin", email: "sergey@example.com" },
      { name: "Sundar Pichai", email: "sundar@example.com" },
    ],
    present: false,
  },
  {
    teamName: "Code Avengers",
    leader: {
      name: "Tony Stark",
      email: "tony@example.com",
      college: "Harvard University",
      year: "4th",
      department: "Electrical Engineering",
    },
    members: [
      { name: "Bruce Banner", email: "bruce@example.com" },
      { name: "Natasha Romanoff", email: "natasha@example.com" },
      { name: "Clint Barton", email: "clint@example.com" },
    ],
    present: false,
  },
  {
    teamName: "Creative Coders",
    leader: {
      name: "Leonardo da Vinci",
      email: "leonardo@example.com",
      college: "University of Florence",
      year: "2nd",
      department: "Arts and Technology",
    },
    members: [
      { name: "Michelangelo Buonarroti", email: "michelangelo@example.com" },
      { name: "Raphael Sanzio", email: "raphael@example.com" },
      { name: "Donatello di Betto", email: "donatello@example.com" },
    ],
    present: false,
  },
];

const App = () => {
  const [teams, setTeams] = useState(teamsData);
  const [isScanning, setIsScanning] = useState(false);
  const [html5QrCode, setHtml5QrCode] = useState(null);
  const [message, setMessage] = useState("");

  const handleScanClick = () => {
    setIsScanning(true);
    setTimeout(() => {
      const qrScanner = new Html5Qrcode("qr-reader");
      setHtml5QrCode(qrScanner);
    }, 100); 
  };

  const startQrScanner = () => {
    if (!html5QrCode) {
      console.error("QR Scanner not initialized. Click the 'Scan QR' button first.");
      alert("Please click 'Scan QR' to initialize the scanner.");
      return;
    }

    html5QrCode
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 300 },
        (qrCodeMessage) => {
          handleScanResult(qrCodeMessage);
          stopScanner();
        },
        (errorMessage) => {
          console.error("QR Code scanning error:", errorMessage);
        }
      )
      .catch((err) => {
        console.error("Failed to start QR scanner:", err);
      });
  };

  const stopScanner = () => {
    if (html5QrCode) {
      html5QrCode.stop().then(() => {
        console.log("Camera stopped.");
        setIsScanning(false);
        setHtml5QrCode(null);
      });
    }
  };

  const handleScanResult = (email) => {
    const cleanEmail = email.trim().toLowerCase();
    console.log("Scanned email:", cleanEmail);

    let found = false;
    const updatedTeams = teams.map((team) => {
      if (
        team.leader.email.toLowerCase() === cleanEmail || 
        team.members.some((member) => member.email.toLowerCase() === cleanEmail)
      ) {
        found = true;
        return { ...team, present: true };
      }
      return team;
    });

    setTeams(updatedTeams);

    if (found) {
      setMessage(`Congratulations! ${cleanEmail} has been validated and marked as present.`);
    } else {
      setMessage(`Email ${cleanEmail} not found.`);
    }
  };

  return (
    <div>
      <h1>Team Data</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Leader</th>
            <th>Email</th>
            <th>Present</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr key={index}>
              <td>{team.teamName}</td>
              <td>{team.leader.name}</td>
              <td>{team.leader.email}</td>
              <td>{team.present ? "Yes" : "No"}</td>
              <td>
                {!team.present && <button onClick={handleScanClick}>Scan QR</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isScanning && (
        <div>
          <div id="qr-reader" style={{ width: "500px", height: "500px" }}></div>
          <button onClick={startQrScanner}>Start Scanning</button>
          <button onClick={stopScanner}>Stop Scanning</button>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;