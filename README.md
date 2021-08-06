# Level Editor

This tool can be used to design tile based game levels with sprites/billboards.

## Description

This tool was initilly developed as a part of the LOSPEC Game Jam 1 entry Copilot: Dark Spellware https://fortron.itch.io/copilot-dark-spellware.
After the game jam was completed, several enhancements were made to increase performance, ease of use, and to be used for other game development efforts.

## Getting Started

### Dependencies

* Describe any prerequisites, libraries, OS version, etc., needed before installing program.
* ex. Windows 10

### Installing

* How/where to download your program
* Any modifications needed to be made to files/folders

### Executing program

* How to run the program
* Step-by-step bullets
```
code blocks for commands
```

### Importing existing Maps and Sprites

* Step-by-step bullets

### Importing custom textures

#### Importing Tiles

In order to import level tiles into the level editor, select the 'Tile' option under the Import Textures menu.
The import feature accepts a zip file containing image files.

The images will be loading into the level editor in an alphabetical order unless a meta file is included in the imported zip.
The order of the tiles can be dictated by an optional json file. 

Below is an example of the required json file format:
```
[
  "image1.png",
  "image2.png
]
``` 

#### Importing Sprites/Billboards

In order to import sprites/billboards into the level editor, select the 'Sprite' option under the Import Textures menu.
The import feature accepts a json file.

Below is an example of the required json file format:
```
[
  "sprite1",
  "sprite2"
]
``` 

### Editing a Level
* Step-by-step bullets

### Generating a Level
* Step-by-step bullets

## Help

Any advise for common problems or issues.
```
command to run if program contains helper info
```

## Authors

Contributors names and contact info

Nick Valenti  
James Best

## Version History

* 0.1
    * Initial Release

## License


