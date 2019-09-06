import React from 'react';
import { Link } from 'react-router-dom';

// Interfaces
export interface AppProps {
    data: any;
}

class RenderLinks extends React.Component<AppProps> {
    constructor(props: AppProps) {
        super(props);
    }

    renderLinks = () => {
        const data = this.props.data;
        return data.organisations.map((organisation: any, key: any) => {
            return (
                <div key={key} >
                    <Link to={`/${organisation.slug}`}>{organisation.name}</Link>
                </div>
            );
        });
    }

    render() {
        return (
            <div className={'ui segments'}>
                <div className={'ui segment large header'}>Sample</div>
                <div className={'ui segment'}>
                    {this.renderLinks()}
                </div>
            </div>
        );
    }
}

export default RenderLinks;