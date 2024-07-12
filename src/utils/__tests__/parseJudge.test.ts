import { expect, test } from "vitest";

import { genJudge, parseJudge } from "../parseJudge";

const judges = [
  "0/10////WA|0.001|Output is Incorrect||WA|0|Output is Incorrect||WA|0|Output is Incorrect||WA|0|Output is Incorrect||WA|0|Output is Incorrect||WA|0|Output is Incorrect||WA|0|Output is Incorrect||WA|0|Output is Incorrect||WA|0|Output is Incorrect||WA|0|Output is Incorrect",
  `
  /tmp/code.cpp: In function ΓÇÿint main()ΓÇÖ:                        +
  /tmp/code.cpp:9:2: error: ΓÇÿcinΓÇÖ was not declared in this scope  +
    cin>>h>>m;                                                    +
    ^~~                                                           +
  /tmp/code.cpp:17:3: error: ΓÇÿcoutΓÇÖ was not declared in this scope+
    cout<<":'(";                                                 +
    ^~~~                                                         +
  /tmp/code.cpp:17:3: note: suggested alternative: ΓÇÿcntΓÇÖ          +
    cout<<":'(";                                                 +
    ^~~~                                                         +
    cnt                                                          +
  /tmp/code.cpp:22:1: error: ΓÇÿcoutΓÇÖ was not declared in this scope+
    cout<<":)";                                                    +
    ^~~~                                                           +
  /tmp/code.cpp:22:1: note: suggested alternative: ΓÇÿcntΓÇÖ          +
    cout<<":)";                                                    +
    ^~~~                                                           +
    cnt 
  `,
];

test("check parse judge and gen judge", async () => {
  for (const judge of judges) {
    const parsedJudge = parseJudge(judge);
    const generatedJudge = genJudge(parsedJudge);
    expect(generatedJudge).toBe(judge);
  }
});
