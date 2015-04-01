'This script query the WMI Database using the class Win32_DiskDrive
'and send results in JSON format to use LLD discovery

'Compound the WMIQuery
strWMIQuery = "SELECT * FROM Win32_DiskDrive"

strComputer = "." 
Set objWMIService = GetObject("winmgmts:\\" & strComputer & "\root\CIMV2") 
Set colItems = objWMIService.ExecQuery(strWMIQuery)
	
'JSON FORMAT FOR DISCOVERY
Wscript.Echo "{" & vbCr
Wscript.Echo vbTab & chr(34) & "data" & chr(34) & ":" & "[" & vbCrLf
Wscript.Echo vbTab & "{"

i=1
For Each objItem in colItems
	If (i <> 1) then
		WScript.Echo vbTab & "{"
	End If
	Wscript.Echo vbTab & vbTab & chr(34) & "{#DISKINDEX}" & chr(34) & ":" & chr(34) & objItem.Index & chr(34)
	
	if (i <> colItems.Count) then
		Wscript.Echo vbTab & "}" & vbCrLf & vbTab & ","
	Else
		WScript.Echo vbTab & "}"
	End If
	i=i+1
	Next

'JSON FORMAT FOR DISCOVERY
Wscript.Echo vbCrlf & vbTab & "]"
Wscript.Echo "}"