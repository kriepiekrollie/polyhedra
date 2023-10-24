import { Octahedron_Truncate } from "./ShapeInterpolaters.js";

export const shapeObject = Octahedron_Truncate(0.5);

export function Info() {
  return (
    <>
      <h1> Truncated Octahedron </h1>
      <h2> <a href="https://en.wikipedia.org/wiki/Truncated_octahedron"> Wikipedia page </a> </h2>
      <p> It's like trying soo hard to be a soccer ball but it's just not quite there yet. </p>
      <table>
        <tbody>
          <tr>
            <th> Type </th>
            <td> Archimedean Solid </td>
          </tr>
          <tr>
            <th> Faces </th>
            <td> 14 </td>
          </tr>
          <tr>
            <th> Edges </th>
            <td> 36 </td>
          </tr>
          <tr>
            <th> Vertices </th>
            <td> 24 </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default shapeObject;
