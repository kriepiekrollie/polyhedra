
export const shapeObject = (() => {
  const p = (1 + Math.sqrt(5)) / 2;

  const a = 1 / 2;
  const b = p / 2;
  const c = p * p / 2;

  const vertices = [
    { x : p, y : 0, z : 0 },
    { x :-p, y : 0, z : 0 },
    { x : 0, y : p, z : 0 },
    { x : 0, y :-p, z : 0 },
    { x : 0, y : 0, z : p },
    { x : 0, y : 0, z :-p },

    { x : a, y : b, z : c },
    { x : a, y : b, z :-c },
    { x : a, y :-b, z : c },
    { x : a, y :-b, z :-c },
    { x :-a, y : b, z : c },
    { x :-a, y : b, z :-c },
    { x :-a, y :-b, z : c },
    { x :-a, y :-b, z :-c },

    { x : b, y : c, z : a },
    { x : b, y : c, z :-a },
    { x : b, y :-c, z : a },
    { x : b, y :-c, z :-a },
    { x :-b, y : c, z : a },
    { x :-b, y : c, z :-a },
    { x :-b, y :-c, z : a },
    { x :-b, y :-c, z :-a },

    { x : c, y : a, z : b },
    { x : c, y : a, z :-b },
    { x : c, y :-a, z : b },
    { x : c, y :-a, z :-b },
    { x :-c, y : a, z : b },
    { x :-c, y : a, z :-b },
    { x :-c, y :-a, z : b },
    { x :-c, y :-a, z :-b },
  ];
  const faces = [];
  return {
    Vertices: vertices,
    Faces: faces,
  };
})();

export function Info() {
  return <></>;
}

export default shapeObject;
