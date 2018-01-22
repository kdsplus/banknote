!macro customInstall
    DetailPrint "Register banknote URI Handler"
    DeleteRegKey HKLM "Software\banknote"
    WriteRegStr HKLM "Software\banknote" "URL" "banknote.appplay.co.kr"
    WriteRegStr HKLM "Software\banknote" "URL Protocol" "https"
    WriteRegStr HKLM "Software\banknote" "DisplayName" "banknote"
    WriteRegStr HKLM "Software\banknote" "installdir" "$INSTDIR\"
    WriteRegStr HKLM "Software\banknote" "version" "1.0.1"
    WriteRegStr HKLM "Software\banknote" "runfile" "${APP_EXECUTABLE_FILENAME}"
    WriteRegStr HKCR "Software\banknote" "DefaultIcon" "$INSTDIR\${APP_EXECUTABLE_FILENAME}"
!macroend