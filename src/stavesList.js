import React, { useState } from "react";

export function StavesList() {
    const [staves, setStaves] = useState([
        {
          num: 0,
          chord : 'none',
          otave : 'c3'
        },
        {
          num: 1,
          chord : 'none',
          otave : 'c3'
        },
        {
          num: 2,
          chord : 'none',
          otave : 'c3'
        },
        {
          num: 3,
          chord : 'none',
          otave : 'c3'
        },
      ]);
}