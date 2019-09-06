import React from 'react';

// // Import regular stylesheet
import styles from '../../styles/sample.scss';

// Import Local storage
import StoreLocal from '../../libs/LocalStorage';
import { ClearLocalStorage, SaveToLocalStorage, GetFromLocalStorage } from '../../libs/LocalStorage';
import { Input, Grid, Form } from 'semantic-ui-react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAsterisk, faCheck, faExclamation} from '@fortawesome/free-solid-svg-icons';

library.add(faAsterisk, faCheck, faExclamation);

// Interfaces
export interface LocalStorage {
  clearLocalStorage: ClearLocalStorage;
  saveToLocalStorage: SaveToLocalStorage;
  getFromLocalStorage: GetFromLocalStorage;
}
export interface AppProps {
  id: string;
  data: Object;
  updateData(data: Object): void; 
}
export interface AppState {
  sample_jmeno: string;
  sample_prijmeni: string;
  sample_telefon: string;
  sample_email: string;
  nameError: boolean;
  surnameError: boolean;
  numberError: boolean;
  emailError: boolean;
  mainError: boolean;
  nameCounter: number;
  surnameCounter: number;
  numberCounter: number;
  emailCounter: number;
}

class FormSample extends React.PureComponent<AppProps, AppState> {
    private storeLocal: LocalStorage = new StoreLocal;
    private componentName: string = 'form_sample';

    /** ID for local storage */
    private id: string = this.props.id;
    
    constructor(props: AppProps) {
      super(props);

      this.state = {
        sample_jmeno:  '',
        sample_prijmeni:  '',
        sample_telefon:   '',
        sample_email:   '',
        nameError: false,
        surnameError: false,
        numberError: false,
        emailError: false,
        mainError: true,
        nameCounter: 0,
        surnameCounter: 0,
        numberCounter: 0,
        emailCounter: 0
      };

      this.changeName = this.changeName.bind(this);
      this.changeSurname = this.changeSurname.bind(this);
      this.changePhone = this.changePhone.bind(this);
      this.changeEmail = this.changeEmail.bind(this);
      this.changeNameError = this.changeNameError.bind(this);
      this.changeSurnameError = this.changeSurnameError.bind(this);
      this.changeNumberError = this.changeNumberError.bind(this);
      this.changeEmailError = this.changeEmailError.bind(this);

    }


    public componentDidMount = async () => {
      const data = await JSON.parse(this.storeLocal.getFromLocalStorage(this.id));
      if (data) {
        await this.setState(data);
      }

      await this.props.updateData(data);
    }
  
  

  public updateMainError = async () => {
    let errors: any = {};
    let nameCounter =  await this.state.nameCounter;
    let surnameCounter =  await this.state.surnameCounter;
    let numberCounter =  await this.state.numberCounter;
    let emailCounter = await this.state.emailCounter;

    errors.nameError= await this.state.nameError;
    errors.surnameError= await this.state.surnameError;
    errors.numberError = await this.state.numberError;
    errors.emailError = await this.state.emailError;

    const e = Object.keys(errors).filter((key)=>errors[key]).join(',').length;

    if ((nameCounter > 0 && surnameCounter > 0 && numberCounter > 0 && emailCounter > 0)) {
      if (e > 0) {
        await this.setState({mainError:true}, async () => {
          await this.props.updateData(this.state);
        });
      } else {
        await this.setState({mainError:false}, async () => {
          await this.props.updateData(this.state);
        });
      }
    }
  };

  public changeNameError = async () => {
    let counter = await this.state.nameCounter;

    if (counter === 0) {
      await this.setState({nameError: true});
      await this.setState({nameCounter: ++counter});
      await this.updateMainError();
    }
  }

  public changeSurnameError = async () => {
    let counter = await this.state.surnameCounter;

    if (counter === 0) {
      await this.setState({surnameError: true});
      await this.setState({surnameCounter: ++counter});
      await this.updateMainError();
    }
  }


  public changeNumberError = async () => {
    let counter = await this.state.numberCounter;

    if (counter === 0) {
      await this.setState({numberError: true});
      await this.setState({numberCounter: ++counter});
      await this.updateMainError();
    }
  }


  public changeEmailError = async () => {
    let counter = await this.state.emailCounter;

    if (counter === 0) {
      await this.setState({emailError: true});
      await this.setState({emailCounter: ++counter});
      await this.updateMainError();
    }
  }


  public changeName = (e: React.ChangeEvent<HTMLInputElement>) => {

    /** NAME VALIDATOR */

    if (e.currentTarget.name === 'sample_jmeno') {
      const name: any = e.currentTarget.value;
      const regexp = new RegExp('(^[a-zA-ZáčďéěíňóřšťůúýžľôöäüÁČĎÉĚÍŇÓŘŠŤŮÚÝŽĽÄÔÜÖ \.\'\-\`]{2,30}$)+');
      if (regexp.test(name)) {

          this.setState({ nameError: false }, async () => {

            await this.props.updateData(this.state);
            await this.updateMainError();

            await this.storeLocal.saveToLocalStorage(this.id, `${JSON.stringify(this.state)}`);

          });
      } else {

          this.setState({ nameError: true }, async () => {

            await this.props.updateData(this.state);
            await this.updateMainError();

            await this.storeLocal.saveToLocalStorage(this.id, `${JSON.stringify(this.state)}`);

          });
      }
    }

    this.setState({sample_jmeno:e.currentTarget.value});

  }

  public changeSurname = (e: React.ChangeEvent<HTMLInputElement>) => {

    /** SURNAME VALIDATOR */

    if (e.currentTarget.name === 'sample_prijmeni') {
      const surname: any = e.currentTarget.value;
      const regexp = new RegExp('(^[a-zA-ZáčďéěíňóřšťůúýžľôöäüÁČĎÉĚÍŇÓŘŠŤŮÚÝŽĽÄÔÜÖ \.\'\-\`]{2,30}$)+');
      
      if (regexp.test(surname)) {

          this.setState({ surnameError: false }, async () => {

            await this.props.updateData(this.state);
            await this.updateMainError();

            await this.storeLocal.saveToLocalStorage(this.id, `${JSON.stringify(this.state)}`);

          });
      } else {

          this.setState({ surnameError: true }, async () => {

            await this.props.updateData(this.state);
            await this.updateMainError();

            await this.storeLocal.saveToLocalStorage(this.id, `${JSON.stringify(this.state)}`);

          });
      }
    }

    this.setState({sample_prijmeni: e.currentTarget.value});
  }

  public changePhone = (e: React.ChangeEvent<HTMLInputElement>) => {

    /** PHONE VALIDATOR */

    if (e.currentTarget.name === 'sample_telefon' ) {
      const number: any = e.currentTarget.value;
      const regexp = new RegExp('^[+]?[()/0-9. -]{9,}$');

      if (regexp.test(number)) {

          this.setState({numberError: false}, async () => {

            await this.props.updateData(this.state);
            await this.updateMainError();

            await this.storeLocal.saveToLocalStorage(this.id, `${JSON.stringify(this.state)}`);

        })
      } else {

          this.setState({ numberError: true }, async () => {

            await this.props.updateData(this.state);
            await this.updateMainError();

            await this.storeLocal.saveToLocalStorage(this.id, `${JSON.stringify(this.state)}`);

          });
      }
    }

    this.setState({sample_telefon: e.currentTarget.value});

  }

  public changeEmail = async (e: React.ChangeEvent<HTMLInputElement>) => {

    /** EMAIL VALIDATOR */

    if (e.currentTarget.name === 'sample_email' ) {

      const email: any = e.currentTarget.value;
      const regexp = new RegExp('[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}');

      if (regexp.test(email)) {

          this.setState({ emailError: false }, async () => {

            await this.props.updateData(this.state);
            await this.updateMainError();

            await this.storeLocal.saveToLocalStorage(this.id, `${JSON.stringify(this.state)}`);

          });
      } else {
        
          this.setState({ emailError: true }, async () => {

            await this.props.updateData(this.state);
            await this.updateMainError();

            await this.storeLocal.saveToLocalStorage(this.id, `${JSON.stringify(this.state)}`);

          });
      }      
    }
    
    this.setState({sample_email: e.currentTarget.value});

  }


  public render() {
    return (
      <div className={'ui segment'}>
      <div className={styles.Description}>Sample</div>
      <div className={styles.DescriptionIcon}><i className={'fa fa-user-o fa-lg'}></i></div>

        <div className={styles.Block}>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column mobile={16} computer={5}><span className={styles.Label}>Jméno&nbsp;<span><FontAwesomeIcon className={styles.asterisk} icon={faAsterisk} /></span></span></Grid.Column>
              <Grid.Column  mobile={16} computer={9}>
                <Input error={this.state.nameError} name={'sample_jmeno'} onBlur={() => this.changeNameError()} onChange={(e) => {this.changeName(e); }} value={this.state.sample_jmeno} placeholder={'Jméno'}  />
                <FontAwesomeIcon className={!this.state.nameError && this.state.nameCounter > 0 ? styles.IconOk : styles.Hidden} icon={faCheck} />
                <FontAwesomeIcon className={this.state.nameError && this.state.nameCounter > 0 ? styles.IconError : styles.Hidden} icon={faExclamation} />
            </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>

        <div className={styles.Block}>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column mobile={16} computer={5}><span className={styles.Label}>Příjmení&nbsp;<span><FontAwesomeIcon className={styles.asterisk} icon={faAsterisk} /></span></span></Grid.Column>
              <Grid.Column  mobile={16} computer={9}>
              <Input error={this.state.surnameError} name={'sample_prijmeni'} onBlur={() => this.changeSurnameError()} onChange={(e) => {this.changeSurname(e); }} value={this.state.sample_prijmeni} placeholder={'Příjmení'}  />
              <FontAwesomeIcon className={!this.state.surnameError && this.state.surnameCounter > 0 ? styles.IconOk : styles.Hidden} icon={faCheck} />
              <FontAwesomeIcon className={this.state.surnameError  && this.state.surnameCounter > 0 ? styles.IconError : styles.Hidden} icon={faExclamation} />
            </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>

        <div className={styles.Block}>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column mobile={16} computer={5}><span className={styles.Label}>Kontaktní telefon&nbsp;<span><FontAwesomeIcon className={styles.asterisk} icon={faAsterisk} /></span></span></Grid.Column>
              <Grid.Column  mobile={16} computer={9}>
                <Input error={this.state.numberError} name={'sample_telefon'} onBlur={() => this.changeNumberError()} onChange={(e) => {this.changePhone(e); }} value={this.state.sample_telefon} placeholder={'Kontaktní telefon'}  />
                <FontAwesomeIcon className={!this.state.numberError && this.state.numberCounter > 0 ? styles.IconOk : styles.Hidden} icon={faCheck} />
                <FontAwesomeIcon className={this.state.numberError  && this.state.numberCounter > 0 ? styles.IconError : styles.Hidden} icon={faExclamation} />
            </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>

        <div className={styles.Block}>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column mobile={16} computer={5}><span className={styles.Label}>Email&nbsp;<span><FontAwesomeIcon className={styles.asterisk} icon={faAsterisk} /></span></span></Grid.Column>
              <Grid.Column  mobile={16} computer={9}>
                <Input error={this.state.emailError} name={'sample_email'} onBlur={() => this.changeEmailError()} onChange={(e) => {this.changeEmail(e); }} value={this.state.sample_email} placeholder={'Kontaktní email'}  />
                <FontAwesomeIcon className={!this.state.emailError && this.state.emailCounter > 0 ? styles.IconOk : styles.Hidden} icon={faCheck} />
                <FontAwesomeIcon className={this.state.emailError  && this.state.emailCounter > 0 ? styles.IconError : styles.Hidden} icon={faExclamation} />
            </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>

      </div>
    );
  }
}


export default FormSample;

