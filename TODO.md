# Things todo for hypergraphos


## The following license-text should be prepended to all source-code-files

Exchange the license in `LICENSE.txt` with this one. Do not prepend to config-files.
Please use the following license-text throughout the project. Another line
with copyright-holders may be appended. Please make sure that extra lines
with copyright-holders should only appear in those files that have actually
been created by the persons mentioned.

```
MIT License

Copyright (c) 2024 Honda Research Institute Europe GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
```
Copyright (c) 2024 Antonello Ceravola, Frank Joublin, Honda Research Institute Europe GmbH

This file is part of HyperGraphOS.

This source code is licensed under the MIT License found in the
LICENSE file in the root directory of this source tree.
```


## Apache 2.0 license

Dependency winbox (not bundled) has *Apache 2.0* license.


## README

Add docu for a minimal setup so that people can evaluate the algorithm more easily.


## Snippets

Two snippets have been found with potential partial copies:

`DSLComposeDSL.js` and `HierarchyDSL.js`. Both snippets seem to originate in the
`gojs` software, which is property of NorthwoodsSoftware. Has to be checked if that is an issue.


### DSLComposeDSL.js

Tooltips have been copied verbatim from the inline-documentation in `@types/node 0.1.450`, lines 1609-1642,
properties have the exact same name. For some reason the props are commented out. Since the wording is exact
this does not seem incidental. Please rephrase the tooltips slightly.


### HierarchyDSL.js

A substantial part of lines 148 - 186 have been copied verbatim from lines 492 - 521 of `logic-helper 1.1.31`.
Some lines are missing, but the comments are exactly the same, so this does not seem incidental. Please
remove the comments.


## Non-standard license-header

The following files have a non-standard header. Please update to header mentioned above.

```
localFileServer/DSL/TreeDSL.js
system/2.1/startServerX.bat
system/2.1/script/getConfigValue.js
system/2.1/simpleFileServer/simpleFileServer.js
system/2.1/simpleFileServer/simpleFileServerConfig.js
system/2.1/startServer.bat
system/2.1/startServerX.ps1
system/2.1/virtualEnv.js
system/2.1/startServer.ps1
system/2.1/server/routes/auth.js
system/2.1/server/server.js
system/2.1/server/server-express.js
system/2.1/startServer2.bat
system/2.1/serverConfig.js
system/2.1/client/EventManager.js
system/2.1/client/EditorBase.js
system/2.1/client/indexHG.html
system/2.1/client/editors/ExploreEditorWrapper.js
system/2.1/client/editors/ACEWrapper.js
system/2.1/client/editors/HChatWrapper.js
system/2.1/client/editors/Editors.js
system/2.1/client/lib/ModelExplorer/2.0/ModelExplorer.js
system/2.1/client/lib/htmlMenu/1.0/htmlMenu.js
system/2.1/client/lib/htmlMenu/1.2/htmlMenu.css
system/2.1/client/lib/htmlMenu/1.2/htmlMenu.js
system/2.1/client/lib/htmlMenu/1.1/htmlMenu.css
system/2.1/client/lib/htmlMenu/1.1/htmlMenu.js
system/2.1/client/lib/Espresso/1.0/Espresso.js
system/2.1/client/lib/DataFlowEngine/1.5/DataFlowEngine.js
system/2.1/client/lib/ChatGPT/1.0/ChatGPT.js
system/2.1/client/lib/ChatGPT/1.1/ChatGPT.js
system/2.1/client/lib/CodeFlowEngine/1.4/CodeFlowEngine.js
system/2.1/client/lib/CodeFlowEngine/1.5/CodeFlowEngine.js
system/2.1/client/lib/NodeContentGen/1.0/NodeContentGen.js
system/2.1/client/GraphWrapper.js
system/2.1/client/script.js
system/2.1/client/MainScript.js
system/2.1/client/ServerManager.js
system/2.1/client/index.css
system/2.1/client/GraphEditor.js
system/2.1/client/EditorChangeManager.js
system/2.1/client/EditorManager.js
```

The header looks like this:

```
=============================================================================
Licensed Materials - Property of Frank Joublin and Antonio Ceravola.
(C) Copyright Frank Joublin and Antonio Ceravola. 2021, All Rights Reserved.
France Government Users Restricted Rights - Use, duplication or disclosure
restricted by GSA ADP Schedule Contract with Frank Joublin and Antonio Ceravola.
=============================================================================
Module: MDDTools Server Manager
Date: 10.07.2020
=============================================================================
```

The dates vary. It was not clear what relation-ship this code has to HRI-code.
A talk with management today (2024-10-23) revealed that there is no arrangement
and all code is considered property of HRI as per German Copyright Act:
Frank and Antonello are creators and can assert this with a copyright-line.
Having created this software in the context of their working contract automatically
confers the proprietary rights to the software to HRI. This should be acknowledged
with an additional copyright-line mentioning HRI.
Please change the license to MIT.


## Missing copy-right-header

The following files have no copyright-header (somehow have been missed by BST.py).
Please add the MIT license to all source-code-files (config-files may be ommitted).

```
localFileServer/DSL/ButtonDSL.js
localFileServer/DSL/DefaultDSL.js
localFileServer/DSL/ConnectorsDSL.js
localFileServer/DSL/ThinkingDSL.js
localFileServer/DSL/ThebesInterfaceDSL.js
localFileServer/DSL/TextLabelsDSL.js
localFileServer/DSL/PicturesDSL.js
localFileServer/DSL/DSLComposeDSL.js
localFileServer/DSL/NoteDSL.js
localFileServer/DSL/TableDSL.js
localFileServer/DSL/HierarchyDSL.js
localFileServer/DSL/TestFlowDSL.js
localFileServer/DSL/DSLConfigDSL.js
localFileServer/DSL/DialogDSL.js
localFileServer/DSL/ThebesConnectDSL.js
localFileServer/DSL/ThebestDSL.js
localFileServer/DSL/CodeFlowDSL.js
localFileServer/DSL/DataFlowDSL.js
localFileServer/DSL/PropertyDSL.js
localFileServer/DSL/ThebesDSL.js
localFileServer/System/Includes/DSLInclude.js
system/2.1/client/lib/htmlMenu/1.0/htmlMenu.css
system/2.1/client/lib/resizableDiv/1.2/resizableDiv.css
system/2.1/client/lib/resizableDiv/1.2/resizableDiv.js
system/2.1/client/lib/resizableDiv/examples/TestStudio.html
system/2.1/client/lib/resizableDiv/examples/TestStudio.css
system/2.1/client/lib/resizableDiv/examples/TestResizableDiv.html
system/2.1/client/lib/resizableDiv/1.1/resizableDiv.css
system/2.1/client/lib/resizableDiv/1.1/resizableDiv.js
system/2.1/client/lib/multiChatHG/2.0/MultiChatUI2.html
system/2.1/client/lib/multiChatHG/2.0/MultiChatUI2.css
system/2.1/client/lib/multiChatHG/2.0/MultiChatUI2.js
system/2.1/client/lib/hChat/1.0/hChat.js
system/2.1/client/lib/hChat/1.0/hChatExample.html
system/2.1/client/lib/hChat/1.0/hChat.css
system/2.1/client/lib/ChatGPT/1.1/test.html
system/2.1/client/lib/Generators/3.10/lib/TinyGenerator.js
system/2.1/client/lib/Generators/3.10/lib/GeneratorsConfig.js
system/2.1/client/lib/Generators/3.10/lib/BlockGenerator.js
system/2.1/client/lib/Generators/3.10/lib/ReplaceGenerator.js
system/2.1/client/lib/Generators/3.10/lib/ArrayPatternGenerator.js
system/2.1/client/lib/Generators/3.10/lib/FileTemplateGenerator.js
system/2.1/client/lib/Generators/3.10/lib/BasicGenerator.js
system/2.1/client/lib/Generators/3.10/lib/TemplateGenerator.js
system/2.1/client/lib/Generators/3.10/lib/LineBlockGenerator.js
system/2.1/client/lib/Generators/3.10/examples/Test1/TestClass.js.model.js
system/2.1/client/lib/Generators/3.10/examples/Test1/TestClass.js
system/2.1/client/lib/Generators/3.10/examples/Test1/generate.js
system/2.1/client/lib/Generators/3.10/examples/Test1/out.js
system/2.1/client/lib/Generators/3.10/examples/Test2/generateStruct.js
system/2.1/client/lib/Generators/3.10/examples/Test2/getRuleList_Receptionist.js.model.js
system/2.1/client/lib/Generators/3.10/examples/Test2/getRuleList_Receptionist.js
system/2.1/client/lib/Generators/3.10/examples/Test2/generate.js
system/2.1/client/lib/Generators/3.10/examples/Test2/out.js
system/2.1/client/lib/Generators/3.10/examples/Test4/generate.js
system/2.1/client/lib/Generators/3.10/examples/Test6/generate.js
system/2.1/client/lib/Generators/3.10/examples/Test3/Index.html.model.js
system/2.1/client/lib/Generators/3.10/examples/Test3/out.html
system/2.1/client/lib/Generators/3.10/examples/Test3/Index.html
system/2.1/client/lib/Generators/3.10/examples/Test3/generate.js
system/2.1/client/lib/Generators/3.10/examples/Test5/generate.js
system/2.1/client/lib/Generators/3.9/lib/ReplaceGenerator.js
system/2.1/client/lib/Generators/3.9/lib/ArrayPatternGenerator.js
system/2.1/client/lib/Generators/3.9/lib/FileTemplateGenerator.js
system/2.1/client/lib/Generators/3.9/lib/TemplateGenerator.js
system/2.1/client/lib/Generators/3.9/examples/Test1/TestClass.js.model.js
system/2.1/client/lib/Generators/3.9/examples/Test1/TestClass.js
system/2.1/client/lib/Generators/3.9/examples/Test1/generate.js
system/2.1/client/lib/Generators/3.9/examples/Test1/out.js
system/2.1/client/lib/Generators/3.9/examples/Test2/getRuleList_Receptionist.js.model.js
system/2.1/client/lib/Generators/3.9/examples/Test2/getRuleList_Receptionist.js
system/2.1/client/lib/Generators/3.9/examples/Test2/generate.js
system/2.1/client/lib/Generators/3.9/examples/Test2/out.js
system/2.1/client/WSDragDrop.js
system/2.1/client/configs/Bram_config.js
system/2.1/client/configs/UserLocalSMILE_config.js
system/2.1/client/configs/NoName_config.js
system/2.1/client/configs/Cristian_config.js
system/2.1/client/configs/User_config.js
system/2.1/client/configs/UserLocalPavelPlanning_config.js
system/2.1/client/configs/Ebbie_config.js
system/2.1/client/configs/Anto01_config.js
system/2.1/client/configs/UserLocal_config.js
system/2.1/client/configs/UserLocalTopDemo_config.js
system/2.1/client/configs/hyper-graph_config.js
system/2.1/client/configs/DefaultUser_config.js
system/2.1/client/configs/Christophe_config.js
system/2.1/client/configs/Johane_config.js
system/2.1/client/configs/Frank_config.js
system/2.1/client/configs/Antonello_config.js
system/2.1/client/index.html
system/2.1/getUserInfo.js
system/2.1/script/generateSystemLib.js
system/2.1/script/test1.bat
system/2.1/script/generateSystem.bat
system/2.1/script/generateSystem.js
system/2.1/script/serverManager.bat
system/2.1/script/copyAvatarSources.bat
system/2.1/script/test.bat
system/2.1/server/utils/authMiddleware.js
system/2.1/server/utils/get-status.js
system/2.1/server/utils/getFileWithParams.js
system/2.1/server/utils/getLastUpdate.js
system/2.1/server/utils/getFileHistory.js
system/2.1/server/utils/revertToRevision.js
system/2.1/server/utils/shareFiles.js
system/2.1/server/utils/database.js
system/2.1/server/utils/post-server.js
system/2.1/server/utils/utils.js
system/2.1/server/utils/getFileRevision.js
system/2.1/server/utils/get-file-status.js
system/2.1/server/utils/permissions.js
system/2.1/server/utils/execute-script.js
system/2.1/server/Running_config.js
system/2.1/server/service/queue-service.js
system/2.1/server/service/git-service.js
system/2.1/server/routes/protected.js
system/2.1/server/sconfigs/Christophe_sconfig.js
system/2.1/server/sconfigs/Cristian_sconfig.js
system/2.1/server/sconfigs/Antonellos-Mini_sconfig.js
system/2.1/server/sconfigs/Default_sconfig.js
system/2.1/server/sconfigs/Main-PC_sconfig.js
system/2.1/server/sconfigs/982979_sconfig.js
system/2.1/server/sconfigs/Johane_sconfig.js
system/2.1/server/sconfigs/Ebbie_sconfig.js
system/2.1/server/sconfigs/Antonello_sconfig.js
system/2.1/server/sconfigs/QuadCore_sconfig.js
system/2.1/server/sconfigs/iebubech_sconfig.js
system/2.1/server/sconfigs/RE900106_sconfig.js
system/2.1/server/sconfigs/Bram_sconfig.js
system/2.1/server/sconfigs/Frank_sconfig.js
system/2.1/server/sconfigs/RE901875_sconfig.js
system/2.1/server/sconfigs/RE900575_sconfig.js
system/2.1/server/models/historyRequest.js
system/2.1/server/models/user.js
system/2.1/server/proxyServer.js
system/2.1/simpleFileServer/index.html
```


## Possible credentials

The following files are possible credentials and should **not** be in the repository.
Use a script to create them.

```
system/2.1/server/server.cert
system/2.1/server/server.key
```


## Other

1. Please remove (or get the consent of the people involved)
   a) config-files named like associates or contractors,
   b) names from client/index.html
2. Definitely remove config-files with HRI-assoicate-numbers as a name.
3. Add a recent `package.json` and `package-lock.json`.

