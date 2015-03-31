'This script query the status of a Physycal Disk using 2 parameters,
'the name of the disk and the name of the properties

if Wscript.Arguments.Count <> 1  then
	Wscript.Echo "Incorrect parameters"
	Wscript.Quit(1)
End If

diskname = WScript.Arguments(0)

strComputer = "."
wql = "SELECT * FROM Win32_Volume WHERE DriveLetter = '" & diskname & "'"

Set objWMIService = GetObject("winmgmts:\\" & strComputer & "\root\CIMV2")
Set colItems = objWMIService.ExecQuery(wql)

For Each objItem in colItems
	WScript.Echo Trim(objItem.Label)
Next
