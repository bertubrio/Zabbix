'Script variables
Dim WshShell,oExec

Set WshShell = Wscript.CreateObject("WScript.Shell")
oExec = WshShell.Run("%windir%\\system32\\inetsrv\\appcmd.exe list wp")

'
'WP "4316" (applicationPool:xxx)
'WP "4080" (applicationPool:yyy)
'WP "3200" (applicationPool:zzz)
'

'Description of de regular expression
Set RE = New RegExp
RE.IgnoreCase = True
RE.Global = True
RE.Pattern = "[WP]{1}\s" & chr(34) & "\d{3,+}" & chr(34) & "\([^:]+[:]+[^\)]+\)"

WScript.Echo RE.Pattern
'/WP "(\d+)" \([^:]+:([^\)]+)\)/

'JSON FORMAT FOR DISCOVERY
Wscript.Echo "{" & vbCr
Wscript.Echo vbTab & chr(34) & "data" & chr(34) & ":" & "[" & vbCrLf
Wscript.Echo vbTab & "{"

i=1
Do while (!oExec.StdOut.AtEndOfStream)
'
	set line = oExec.StdOut.ReadLine()
'	set match = RE.exec(line)

	RE.Test(line) <> false
'		
'	if (match) {
		Wscript.Echo vbTab & vbTab & chr(34) & "{#WPNAME}" & chr(34) & ":" & chr(34) &  & chr(34)
'		if (next) print("\t,")
'		next = true;
'		
'		Wscript.Echo vbTab & vbTab & chr(34) & "{#WPNAME}" & chr(34) & ":" & chr(34) &  & chr(34)
'		print("\t\t{\"{#WPNAME}\":\"" + match[2] + "\"}")
'	}
'}
Loop

'JSON FORMAT FOR DISCOVERY
Wscript.Echo vbCrlf & vbTab & "]"
Wscript.Echo "}"
