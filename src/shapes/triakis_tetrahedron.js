import { Tetrahedron_Triakis } from "./ShapeInterpolaters.js"

export const shapeObject = Tetrahedron_Triakis(2.0 / 5.0);

export function Info() {
  return (
    <>
      <h1> Triakis Tetrahedron </h1>
      <h2> <a href="https://en.wikipedia.org/wiki/Triakis_tetrahedron"> Wikipedia page </a> </h2>
      <p> It's a triangular pyramid, with triangular pyramids glued to its faces!!! </p>
      <table>
        <tbody>
          <tr>
            <th> Type </th>
            <td> Catalan Solid </td>
          </tr>
          <tr>
            <th> Faces </th>
            <td> 12 </td>
          </tr>
          <tr>
            <th> Edges </th>
            <td> 18 </td>
          </tr>
          <tr>
            <th> Vertices </th>
            <td> 8 </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default shapeObject;
