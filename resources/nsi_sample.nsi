!define setup       "LCB-installer.exe"
!define company     "Infdot"
!define prodname    "LCB"
!define exec        "LCB.exe"

!define srcdir      "dist\LCB-win32-ia32"

!define regkey      "Software\${company}\${prodname}"
!define uninstkey   "Software\Microsoft\Windows\CurrentVersion\Uninstall\${prodname}"
!define startmenu   "$SMPROGRAMS"

!include "MUI2.nsh"

Name    "${prodname}"
OutFile "${setup}"
Icon    "icon.ico"

InstallDir       "$PROGRAMFILES\${company}\${prodname}"
InstallDirRegKey HKLM "${regkey}" ""

!define MUI_ABORTWARNING

!define MUI_FINISHPAGE_NOAUTOCLOSE

!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH

!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES

!insertmacro MUI_LANGUAGE "English"

Section "Copy files and create uninstaller"
  SetOutPath "$INSTDIR"
  File /r "${srcdir}\*.*"
  File "icon.ico"
  WriteUninstaller "$INSTDIR\uninstall.exe"
SectionEnd

Section "Write registry"
  WriteRegStr HKLM "${regkey}"    "Install_Dir"      "$INSTDIR"
  WriteRegStr HKLM "${uninstkey}" "DisplayName"      "${prodname} (remove)"
  WriteRegStr HKLM "${uninstkey}" "UninstallString" '"$INSTDIR\uninstall.exe"'
  WriteRegStr HKCR "${prodname}\DefaultIcon" "" "$INSTDIR\icon.ico"
SectionEnd

Section "Startmenu"
  CreateShortCut "${startmenu}\${prodname}.lnk" "$INSTDIR\${exec}" "" "$INSTDIR\icon.ico"
  CreateShortCut "$DESKTOP\${prodname}.lnk" "$INSTDIR\${exec}" "" "$INSTDIR\icon.ico"
SectionEnd

Section "Uninstall"
  DeleteRegKey HKLM "${uninstkey}"
  Delete "${startmenu}\${prodname}.lnk"
  Delete "$DESKTOP\${prodname}.lnk"
  RMDir /r /REBOOTOK $INSTDIR
SectionEnd