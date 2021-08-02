import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

export default function TextureImport(props) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event, type) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    if (type){
      props.import(event.target.files, type);
    }
    setOpen(false);
  };

  return (
    <div>
      <Button
      ref={anchorRef}
      onClick={handleToggle}
      >
      Texture Import
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open}>
                  <MenuItem>
                    <label htmlFor='tile' style={{width: '100%'}}>Tile</label>
                    <input style={{display: 'none', width: '100%'}} id='tile' type="file" onChange={ (e) => handleClose(e, 'tile') }/>
                  </MenuItem>
                  <MenuItem>
                    <label htmlFor='sprite' style={{width: '100%'}}>Sprites</label>
                    <input style={{display: 'none', width: '100%'}} id='sprite' type="file" onChange={ (e) => handleClose(e, 'sprite') }/>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}