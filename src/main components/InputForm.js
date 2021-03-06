import React, { useState, useEffect } from 'react';
import DenseTable from '../components/DataTable';
import Button from '@material-ui/core/Button';
import LanguageSelector from '../components/LanguageSelector';
import Service from '../Service';

const InputForm = ({
  modelName,
  setOpenDialog,
  setIsLoading,
  setPercentCompleted,
  setStatus,
  setTitle,
}) => {
  const [name, setName] = useState({ name: '', valid: true });
  const [file, setFiles] = useState({ file: null, valid: true });
  const [wMsgs, setWMsgs] = useState({ msg: '', valid: true });
  const [table_data, setTable_data] = useState(null);
  const [lang, setLang] = useState('EN');

  useEffect(() => {
    setName({ name: modelName, valid: true });
  }, [modelName]);

  const validate = (text) => {
    let flag = true;
    if (!file.file) {
      setFiles({ file: null, valid: false, msg: 'field is required' });
      flag = false;
    } else if (!file.file.name.endsWith('.txt')) {
      setFiles({ file: null, valid: false, msg: 'field must be .txt format' });
      flag = false;
    }
    if (name.name === '') {
      setName({ name: '', valid: false });
      flag = false;
    }
    if (text === '') {
      setWMsgs({ msg: 'input required', valid: false });
      flag = false;
    } else {
      const regx = new RegExp('/^[a-zA-Z]+$/');
      for (const str of text.split(' ')) {
        if (regx.test(str)) {
          setWMsgs({
            msg: `${str} must only contain characters`,
            valid: false,
          });

          flag = false;
          break;
        }
      }
    }
    return flag;
  };

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (validate(e.target.words.value)) {
      formData.append('file', file.file);

      formData.append('words', e.target.words.value);
      formData.append('model', name.name);
      formData.append('lang', lang);

      try {
        const res = await Service.sendCompareData(formData);
        setTable_data(res.data);
      } catch (error) {
        setOpenDialog(true);
        if (error.response) {
          setStatus(error.response.data.error.message);
          setTitle(error.response.data.error.type);
        } else {
          setTitle('Error');
          setStatus(error.message);
        }
      }
    }
  };

  const onChange = (e) => {
    setFiles({ file: e.target.files[0], valid: true });
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
                file.valid ? '' : 'is-invalid'
              }`}
              style={{ display: 'none' }}
              onChange={onChange}
            />
            <label htmlFor="uplodaer">
              <Button variant="contained" color="primary" component="span">
                Upload Training Words File
              </Button>
            </label>
            {!file.valid ? (
              <div className="invalid-feedback"> {file.msg}.</div>
            ) : (
              ''
            )}
          </div>
          <div className="form-group mx-sm-3 mb-2">
            <label htmlFor="words">Comparable Terms: </label>
            <input
              id="words"
              name="words"
              type="text"
              className={`form-control ml-2 ${wMsgs.valid ? '' : 'is-invalid'}`}
              placeholder="Words seperated by a comma."
            />
            {!wMsgs.valid ? (
              <div className="invalid-feedback">{wMsgs.msg}.</div>
            ) : (
              ''
            )}
          </div>

          <div className="form-group mx-sm-3 mb-2">
            <input
              type="text"
              className={`form-control ${name.valid ? '' : 'is-invalid'}`}
              placeholder="Model Name."
              value={name.name}
              readOnly
            />
            {!name.valid ? (
              <div className="invalid-feedback">model name is required.</div>
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

      {table_data ? (
        <div className="row mt-5">
          <DenseTable data={table_data} />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default InputForm;
