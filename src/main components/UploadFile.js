import React, { useState, useEffect } from 'react';
import EnhancedTable from '../components/Table';
import Button from '@material-ui/core/Button';
import LanguageSelector from '../components/LanguageSelector';
import Service from '../Service';

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
  const [lang, setLang] = useState('EN');

  useEffect(() => {
    setName({ name: modelName, msg: '', valid: true });
  }, [modelName]);

  const onChange = (e) => {
    const set = new Set([...files.files, ...e.target.files]);
    const fls = [...set];

    setFiles({ files: fls, valid: true });
  };

  const removeFile = (e) => {
    const fs = files.files.filter((file) => !e.includes(file.name));
    console.log(e, fs);
    setFiles({ files: fs, valid: true });
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

  const submit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      files.files.forEach((file) => formData.append(file.name, file));
      formData.append('model', name.name);
      formData.append('lang', lang);
      console.log(formData.get('lang'));
      setOpenDialog(true);
      setIsLoading(true);
      setTitle('Uploadeding Files');

      const listener = (progressEvent) => {
        let percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setPercentCompleted(percentCompleted);
        if (percentCompleted === 100) setIsLoading(false);
        setStatus(
          "Files uploaded suucessefully and is being processed, please wait or comeback later! after the model is finished training you'll see its name in the list."
        );
        setTitle('Upload sucessfull');
      };

      try {
        const res = await Service.sendTrainData(formData, listener);
        setIsLoading(false);
        setTitle('Training sucessfull');
        setStatus('Model Trained! Refresh your page to see it in the list.');
      } catch (error) {
        setTitle('Error');
        setIsLoading(false);
        if (error.response) setStatus(error.response.data.error.message);
        else setStatus(error.message);
      }
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
          <div className="form-group mx-sm-3 mb-2">
            <LanguageSelector
              langs={['EN', 'AR']}
              setLang={setLang}
              lang={lang}
            />
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
