import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EnhancedTable from './Table';
import Button from '@material-ui/core/Button';

const UploadFile = ({
  modelName,
  setOpenDialog,
  setIsLoading,
  setPercentCompleted,
  setStatus,
  setTitle,
}) => {
  const [files, setFiles] = useState({ files: [], valid: true });
  const [name, setName] = useState({ name: '', valid: true, msg: '' });

  useEffect(() => {
    setName({ name: modelName, msg: '', valid: true });
  }, [modelName]);

  const onChange = (e) => {
    const set = new Set([...files.files, ...e.target.files]);
    const fls = [...set];
    // for(const file of )
    // fls.push(file)
    console.log(fls);
    setFiles({ files: fls, valid: true });
  };

  const removeFile = (e) => {
    const fs = files.filter((file) => !e.includes(file.name));
    console.log(e, fs);
    setFiles(fs);
  };

  const validate = () => {
    let flag = true;
    if (files.files.length === 0) {
      setFiles({ files: [], valid: false, msg: 'field is required' });
      flag = false;
    } else {
      for (const f of files.files) {
        if (!f.name.endsWith('.txt')) {
          setFiles({
            files: [],
            valid: false,
            msg: 'all files must .txt format',
          });
          flag = false;
          break;
        }
      }
    }
    if (name.name === '') {
      setName({ name: '', valid: false, msg: 'field is required' });
      flag = false;
    } else {
      const regx = new RegExp('/^[a-zA-Z]+$/');

      if (regx.test(name.name)) {
        setName({
          name: ``,
          valid: false,
          msg: 'illegal model name must be obly alphabetic characters',
        });

        flag = false;
      }
    }

    return flag;
  };

  const submit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      files.files.forEach((file) => formData.append(file.name, file));
      formData.append('model', name.name);
      console.log(formData.get('model'));
      setOpenDialog(true);
      setIsLoading(true);
      setTitle('Uploadeding Files');

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          console.log(progressEvent);
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setPercentCompleted(percentCompleted);
          if (percentCompleted == 100) setIsLoading(false);
          setStatus(
            "Files uploaded suucessefully and is being processed, please wait or comeback later! after the model is finished training you'll see its name in the list."
          );
          setTitle('Upload sucessfull');
        },
      };
      axios
        .post('http://127.0.0.1:5000/', formData, config)
        .then((res) => {
          setIsLoading(false);
          setTitle('Training sucessfull');
          setStatus('Model Trained! Refresh your page to see it in the list.');
        })
        .catch((error) => {
          console.log(error.response.data);
          setTitle('Error');
          setIsLoading(false);
          setStatus(error.response.data);
        });
    }
  };
  return (
    <div className="container">
      <div className="row">
        <form className="form-inline" onSubmit={submit}>
          <div className="form-group mx-sm-3 mb-2">
            <input
              id="uplodaer"
              type="file"
              className={`form-control-file ml-2 ${
                files.valid ? '' : 'is-invalid'
              }`}
              style={{ display: 'none' }}
              onChange={onChange}
              multiple
            />
            <label htmlFor="uplodaer">
              <Button variant="contained" color="primary" component="span">
                Upload Files
              </Button>
            </label>
            {!files.valid ? (
              <div className="invalid-feedback"> {files.msg}.</div>
            ) : (
              ''
            )}
          </div>
          <div className="form-group mx-sm-3 mb-2">
            <label htmlFor="model">Model Name:</label>
            <input
              id="model"
              type="text"
              className={`form-control ml-2 ${name.valid ? '' : 'is-invalid'}`}
              placeholder="Type model name or choose an exising model."
              value={name.name}
              onChange={(e) =>
                setName({ name: e.target.value, valid: true, msg: '' })
              }
            />

            {!name.valid ? (
              <div className="invalid-feedback"> {name.msg}.</div>
            ) : (
              ''
            )}
          </div>
          <button type="submit" className="btn btn-primary ">
            Submit
          </button>
        </form>
      </div>

      <div className="row mt-5">
        <EnhancedTable
          files={files.files}
          removeFile={removeFile}
          removeSekected={removeFile}
        />
      </div>
    </div>
  );
};

export default UploadFile;
