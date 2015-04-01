'This script query the status of a Physycal Disk using 2 parameters,
'the name of the disk and the name of the properties

if Wscript.Arguments.Count <> 2 then
	Wscript.Echo "Incorrect parameters"
	Wscript.Quit(1)
End If

diskindex = WScript.Arguments(0)
counter = WScript.Arguments(1)

strComputer = "."
wql = "SELECT * FROM Win32_DiskDrive WHERE Index = " & diskindex

Set objWMIService = GetObject("winmgmts:\\" & strComputer & "\root\CIMV2")
Set colItems = objWMIService.ExecQuery(wql)

Select Case counter
	Case "status"
		For Each objItem in colItems
			WScript.Echo Trim(objItem.Status)
		Next
	Case "name"
		For Each objItem in colItems
			WScript.Echo Trim(objItem.Name)
		Next
		Wscript.Quit(1)
	Case "model"
		For Each objItem in colItems
			WScript.Echo Trim(objItem.Model)
		Next
		Wscript.Quit(1)		
	Case "size"
		For Each objItem in colItems
			If IsNull(objItem.Size) Then
				Wscript.Echo "0"
				Wscript.Quit(1)
			End IF
			WScript.Echo Trim(objItem.Size)
		Next
		Wscript.Quit(1)
	Case "partitions"
		For Each objItem in colItems
			WScript.Echo Trim(objItem.Partitions)
		Next
		Wscript.Quit(1)
End Select

