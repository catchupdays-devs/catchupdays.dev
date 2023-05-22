// export default async function Link() {
//   return <div />;
// }
//
// export const getServerSideProps = async () => {
//   // here's where the logic for getting the current redirect link from DB would be,
//   // right now we just redirect to the https://catchupdays.dev/ always
//   return {
//     redirect: {
//       destination: "/",
//       permanent: false,
//     },
//   };
// };

import { NextApiRequest, NextApiResponse } from "next";

export default async function Link(
  request: NextApiRequest,
  response: NextApiResponse
) {
  response.status(302).redirect("/");
}
