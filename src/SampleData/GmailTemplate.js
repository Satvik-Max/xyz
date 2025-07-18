export const thankGoogleCloud = (name) => {
  const htmlData = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You - Google Cloud Study Jam</title>
        <style>
            .mybody {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                width: 100%;
                background-color: #f4f4f9;
            }
  
            .containermain {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 10px 6px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                border: 1px solid gray;
            }
  
            img {
                width: 100%;
            }
  
            .header {
                background-color: #4285F4;
                color: #ffffff;
                padding: 20px;
                text-align: center;
                font-size: 14px;
            }
  
            .content {
                padding: 20px;
                text-align: justify;
            }
  
            .content h1 {
                font-size: 20px;
                margin: 0 0 10px;
                color: #333;
            }
  
            .content p {
                font-size: 14px;
                line-height: 1.6;
                color: #555;
                margin-bottom: 20px;
            }
  
            .button {
                text-align: center;
                margin: 20px 0;
            }
  
            .button a {
                background-color: #34A853;
                color: #ffffff;
                text-decoration: none;
                padding: 10px 20px;
                border-radius: 4px;
                font-size: 14px;
            }
  
            .footer {
                background-color: #eeeeee;
                padding: 10px;
                text-align: center;
                font-size: 12px;
                color: #777;
            }
  
            .social-links {
                margin-top: 10px;
            }
  
            .social-links a {
                color: #4285F4;
                text-decoration: none;
                margin: 0 5px;
                font-size: 14px;
            }
  
            .social-links a:hover {
                text-decoration: underline;
                color: #0b66c3;
            }
  
            @media (max-width: 600px) {
                .content h1 {
                    font-size: 18px;
                }
  
                .content p {
                    font-size: 13px;
                }
  
                .button a {
                    font-size: 13px;
                    padding: 8px 16px;
                }
            }
        </style>
    </head>
    <body>
        <div class="mybody">
            <div class="containermain">
                <div class="header">
                    Google Developer Groups - GDG on Campus <br />
                    Government College of Engineering - Nagpur, India
                </div>
                <img src="https://cloud.appwrite.io/v1/storage/buckets/6759caf200334d2297e8/files/67713c8800232ee9dd35/view?project=6749e597002403b3c2d4" alt="GDG Logo" />
                <div class="content">
                    <h1>Congratulations ${name}!</h1>
                    <p>
                        We are thrilled to congratulate you on successfully completing the Google Cloud Study Jam. 
                        Your dedication and enthusiasm for learning cloud technology have truly paid off.
                    </p>
                    <p>
                        You have successfully claimed your Study Jam swags. These rewards celebrate your dedication and achievements in mastering Google Cloud concepts
                    </p>
                </div>
                <div class="footer">
                    If you have any questions about your rewards or the program, feel free to reach out to us. <br />
                    Follow us on social media for the latest updates and future events:
                    <div class="social-links">
                        <a href="http://www.youtube.com/@gdscgcoen3822" target="_blank">YouTube</a> | 
                        <a href="https://chat.whatsapp.com/Ge1u3fw4eOzEOIiUG6z6aJ" target="_blank">WhatsApp</a> | 
                        <a href="https://www.instagram.com/gdgcgcoen" target="_blank">Instagram</a> | 
                        <a href="https://www.linkedin.com/company/gdgoncampus-gcoen/" target="_blank">LinkedIn</a> | 
                        <a href="https://x.com/GDGCGcoen" target="_blank">Twitter</a>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
  return htmlData;
};

export const CustomEmailRes = (salutation, description, endDescription) => {
  const htmlData = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You - Google Cloud Study Jam</title>
        <style>
            .mybody {
                font-family: Arial, sans-serif;
                margin: 0;
                width: 100%;
            }
  
            .containermain {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 10px 6px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                border: 1px solid gray;
            }
  
            img {
                width: 100%;
            }
  
            .header {
                background-color: #4285F4;
                color: #ffffff;
                padding: 20px;
                text-align: center;
                font-size: 14px;
            }
  
            .content {
                padding: 20px;
                text-align: justify;
            }
  
            .content h1 {
                font-size: 20px;
                margin: 0 0 10px;
                color: #333;
            }
  
            .content p {
                font-size: 14px;
                line-height: 1.6;
                color: #555;
                margin-bottom: 20px;
            }
  
            .button {
                text-align: center;
                margin: 20px 0;
            }
  
            .button a {
                background-color: #34A853;
                color: #ffffff;
                text-decoration: none;
                padding: 10px 20px;
                border-radius: 4px;
                font-size: 14px;
            }
  
            .footer {
                background-color: #eeeeee;
                padding: 10px;
                text-align: center;
                font-size: 12px;
                color: #777;
            }
  
            .social-links {
                margin-top: 10px;
            }
  
            .social-links a {
                color: #4285F4;
                text-decoration: none;
                margin: 0 5px;
                font-size: 14px;
            }
  
            .social-links a:hover {
                text-decoration: underline;
                color: #0b66c3;
            }
  
            @media (max-width: 600px) {
                .content h1 {
                    font-size: 18px;
                }
  
                .content p {
                    font-size: 13px;
                }
  
                .button a {
                    font-size: 13px;
                    padding: 8px 16px;
                }
            }
        </style>
    </head>
    <body>
        <div class="mybody">
            <div class="containermain">
                <img src="https://cloud.appwrite.io/v1/storage/buckets/6759caf200334d2297e8/files/67713c8800232ee9dd35/view?project=6749e597002403b3c2d4" alt="GDG Logo" />
                <div class="content">
                    <h1>${salutation},</h1>
                    <p>
                    ${description}      </p>
                    <p>
                      
  ${endDescription}
                    </p>
                    <p>
                    <b>Warm regards</b>,<br/>
                    Google Developer Group On Campus, <br/>
                    Government College of Engineering, Nagpur<br/>
                    gdsc.gcoen@gmail.com
                    </p>

                </div>
                <div class="footer">
                    If you have any questions, feel free to reach out to us. <br />
                    Follow us on social media for the latest updates and future events:
                    <div class="social-links">
                        <a href="http://www.youtube.com/@gdscgcoen3822" target="_blank">YouTube</a> | 
                        <a href="https://chat.whatsapp.com/Ge1u3fw4eOzEOIiUG6z6aJ" target="_blank">WhatsApp</a> | 
                        <a href="https://www.instagram.com/gdgcgcoen" target="_blank">Instagram</a> | 
                        <a href="https://www.linkedin.com/company/gdgoncampus-gcoen/" target="_blank">LinkedIn</a> | 
                        <a href="https://x.com/GDGCGcoen" target="_blank">Twitter</a>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
  return htmlData;
};

export const hackathonInvitation = (companyName, eventDate) => {
  const htmlData = `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Hack-On Invitation</title>
          <style>
              .mybody {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  width: 100%;
              }
  
              .containermain {
                  max-width: 600px;
                background-color: #ffffff;
                  margin: 20px auto;
                  border-radius: 8px;
                  box-shadow: 0 10px 6px rgba(0, 0, 0, 0.1);
                  overflow: hidden;
                  border: 1px solid #ddd;
              }
   img {
                width: 100%;
            }
              .header {
                  background-color: #4285F4;
                  color: #ffffff;
                  padding: 20px;
                  text-align: center;
                  font-size: 18px;
                  font-weight: bold;
              }
  
              .content {
                  padding: 20px;
                  text-align: justify;
              }
  
              .content h1 {
                  font-size: 22px;
                  margin: 0 0 10px;
                  color: #333;
              }
  
              .content p {
                  font-size: 14px;
                  line-height: 1.6;
                  color: #555;
                  margin-bottom: 20px;
              }
  
              .footer {
                background-color: #eeeeee;
                padding: 10px;
                text-align: center;
                font-size: 12px;
                color: #777;
            }
  
            .social-links {
                margin-top: 10px;
            }
  
            .social-links a {
                color: #4285F4;
                text-decoration: none;
                margin: 0 5px;
                font-size: 14px;
            }
  
            .social-links a:hover {
                text-decoration: underline;
                color: #0b66c3;
            }
  
              @media (max-width: 600px) {
                  .content h1 {
                      font-size: 18px;
                  }
  
                  .content p {
                      font-size: 13px;
                  }
              }
          </style>
      </head>
      <body>
          <div class="mybody">
              <div class="containermain">
                   <img src="https://cloud.appwrite.io/v1/storage/buckets/6759caf200334d2297e8/files/67713c8800232ee9dd35/view?project=6749e597002403b3c2d4" alt="GDG Logo" />
                  <div class="content">
                      <h1>Dear ${companyName},</h1>
                      <p>
                          Warm greetings from the Google Developer Group On Campus (GDGC) at Government College of Engineering, Nagpur!
                      </p>
                      <p>
                          We are thrilled to invite you to <strong>Hack-On</strong>, an 8-hour hackathon scheduled for <strong>${eventDate}</strong>, where over 100 talented students will collaborate to solve real-world challenges using technology. As an industry leader, <strong>${companyName}</strong> is uniquely positioned to inspire and support the next generation of tech innovators.
                      </p>
                      <p>
                          This initiative, Hosted by government College of Engineering and supported by Google developer group, is designed to create a meaningful impact in the tech community. By associating with Hack-On, ${companyName} can:
                      </p>
                      <ul>
                          <li><strong>Shape Future Talent:</strong> Directly engage with bright, aspiring developers and innovators.</li>
                         <br/>
                          <li><strong>Reinforce Leadership:</strong> Demonstrate your commitment to advancing technology and fostering innovation.</li>
                         <br/>
                          <li><strong>Expand Influence:</strong> Gain visibility among a community of students, mentors, and industry professionals.</li>
                      </ul>
                      <br/>
                      <p>
                          We recognize <strong>${companyName}</strong> as a pioneer in the tech industry, and we would be honored to collaborate with you in making Hack-On a transformative experience for all participants.
                      </p>
                      <p>
                          Let us know a convenient time to discuss this opportunity further. We’re eager to create something impactful together.
                      </p>
                    <p>
                    <b>Warm regards</b>,<br/>
                    Google Developer Group On Campus, <br/>
                    Government College of Engineering, Nagpur<br/>
                    gdsc.gcoen@gmail.com
                    </p>
                    <a style="color: blue; border: 1px solid blue; padding: 10px; "  href="https://gdgc.gcoen.club/" target="_blank">Visit our website</a>
                
                  </div>
                   <div class="footer">
                    If you have any questions, feel free to reach out to us. <br />
                    Follow us on social media for the latest updates and future events:
                    <div class="social-links">
                        <a href="http://www.youtube.com/@gdscgcoen3822" target="_blank">YouTube</a> | 
                        <a href="https://chat.whatsapp.com/Ge1u3fw4eOzEOIiUG6z6aJ" target="_blank">WhatsApp</a> | 
                        <a href="https://www.instagram.com/gdgcgcoen" target="_blank">Instagram</a> | 
                        <a href="https://www.linkedin.com/company/gdgoncampus-gcoen/" target="_blank">LinkedIn</a> | 
                        <a href="https://x.com/GDGCGcoen" target="_blank">Twitter</a>
                    </div>
                </div>
              </div>
          </div>
      </body>
      </html>`;
  return htmlData;
};


export const HackOnRegConfirmed = (
    name,
    qrCode,
    EventName,
    eventDate,
    eventLocation,
    members,
    paymentStatus,
    leader,
    paymentID,
    TeamName,
    AmPaid
  ) => {
    const memberRows = members
      .map(
        (member, index) => `
            <tr key=${index} >
                <td style='border: 1px solid black; padding: 5px 10px; font-size: 10px; color:black; text-align: left;'>${member.name}</td>
                <td style='border: 1px solid black; padding: 5px 10px; font-size: 10px; color:black; text-align: left;'>${member.email}</td>
                <td style='border: 1px solid black; padding: 5px 10px; font-size: 10px; color:black; text-align: left;'>Member</td>
            </tr>`
      )
      .join("");
  
    const htmlData = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style=' color:black; font-family: Arial, sans-serif; margin: 0; width: 100%;'>
                <div style='max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 10px 6px rgba(0, 0, 0, 0.1); overflow: hidden; border: 1px solid gray;'>
                    <img src="https://cloud.appwrite.io/v1/storage/buckets/6759caf200334d2297e8/files/67713c8800232ee9dd35/view?project=6749e597002403b3c2d4" alt="GDG Logo" style='width: 100%;' />
                    <div style='padding: 20px; text-align: justify;'>
                        <p style="color:black; font-size: 16px;">Dear <strong>${name}</strong>,</p>
                        <p style="color:black; font-size: 16px;">We're thrilled to confirm your registration for the event: <b>${EventName}</b></p>
                        <p style="color:black; font-size: 16px;"><strong>Date:</strong> ${eventDate}</p>
                        <p style="color:black; font-size: 16px;"><strong>Venue:</strong> ${eventLocation}</p>
                        <p style="color:black; font-size: 16px;">Here are your team details:</p>
                        <p style="font-size: 16px; color:black;"><strong>Team Name:</strong> ${TeamName}</p>
                        <table style='width: 100%; border-collapse: collapse; margin-top: 20px; color:black;'>
                            <tr>
                                <th style='border: 1px solid black; padding: 5px 10px; font-size: 10px; color:black; text-align: left;'>Name</th>
                                <th style='border: 1px solid black; padding: 5px 10px; font-size: 10px; color:black; text-align: left;'>Email</th>
                                <th style='border: 1px solid black; padding: 5px 10px; font-size: 10px; color:black; text-align: left;'>Role</th>
                            </tr>
                            <tr>
                                <td style='color:black; border: 1px solid black; padding: 5px 10px; font-size: 10px; color:black; text-align: left;'>${leader.name}</td>
                                <td style='color:black; border: 1px solid black; padding: 5px 10px; font-size: 10px; color:black; text-align: left;'>${leader.email}</td>
                                <td style='color:black; border: 1px solid black; padding: 5px 10px; font-size: 10px; color:black; text-align: left;'>Leader</td>
                            </tr>
                            ${memberRows}
                        </table>
                        <p style="font-size: 16px; margin-top:30px; color:black;"><strong>Payment Status:</strong> ${paymentStatus}</p>
                        <p style="font-size: 16px; color:black;"><strong>Payment ID:</strong> ${paymentID}</p>
                        <p style="font-size: 16px; color:black;"><strong>Paid:</strong>₹ ${AmPaid}</p>
                        <strong>Follow this link to join my WhatsApp group:</strong>
                                  <br />
                                  <a
                                  style="color:blue;"
                                      href="https://chat.whatsapp.com/Hd5IZDgZfnX83xETYDD6QR"
                                      target="_blank"
                                  >
                                      https://chat.whatsapp.com/Hd5IZDgZfnX83xETYDD6QR
                                  </a>
                        </p>
                        <p style="font-size: 16px; color:black;">Thank you for joining us! We look forward to welcoming you to the event.</p>
                        <div style="text-align: center; margin-top: 20px;">
                            <img src="${qrCode}" style="width: 150px; height: 150px; display: block; margin: auto;" alt="QR Code" />
                        </div>
                    </div>
                    <div style='background-color: #eeeeee; padding: 10px; text-align: center; font-size: 12px; color: #777;'>
                        If you have any questions, feel free to reach out to us. <br />
                        Follow us on social media for the latest updates and future events:
                        <div>
                            <a href="http://www.youtube.com/@gdscgcoen3822" target="_blank" style='color: #4285F4; text-decoration: none; margin: 0 5px; font-size: 14px;'>YouTube</a> | 
                            <a href="https://chat.whatsapp.com/Ge1u3fw4eOzEOIiUG6z6aJ" target="_blank" style='color: #4285F4; text-decoration: none; margin: 0 5px; font-size: 14px;'>WhatsApp</a> | 
                            <a href="https://www.instagram.com/gdgcgcoen" target="_blank" style='color: #4285F4; text-decoration: none; margin: 0 5px; font-size: 14px;'>Instagram</a> | 
                            <a href="https://www.linkedin.com/company/gdgoncampus-gcoen/" target="_blank" style='color: #4285F4; text-decoration: none; margin: 0 5px; font-size: 14px;'>LinkedIn</a> | 
                            <a href="https://x.com/GDGCGcoen" target="_blank" style='color: #4285F4; text-decoration: none; margin: 0 5px; font-size: 14px;'>Twitter</a>
                        </div>
                    </div>
                </div>
            </body>
            </html>`;
    return htmlData;
  };
  